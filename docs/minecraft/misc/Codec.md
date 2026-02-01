---
title: Codec
createTime: 2025/05/25 07:53:37
permalink: /minecraft/misc/codec/
---

[[TOC]]

## 1 数据驱动的基石

在目前的Minecraft（1.13+）模组开发中，数据驱动已成为主流。无论是自定义生物群系、新的配方类型还是某些复杂的方块行为，我们都倾向于将配置信息存储在 JSON 文件中，而不是硬编码在Java代码里。这极大地提高了模组的灵活性和可配置性。

然而，如何安全、高效地在 JSON 数据和游戏内的 Java 对象之间进行转换呢？这正是 Codec 发挥作用的地方。本文将简单地探讨 Codec 的概念、用途和优势，~~并结合我的 PortalTransform 模组中的代码进行实例分析~~。所以有一些不完全正确的地方请指出。

### 1.1 Codec 的核心概念

Codec（编解码器）这个词在百度百科中的解释是一个能够对一个信号或者一个数据流进行变换的设备或者程序。而我的世界中的 Codec 指的是一个由Mojang开发并深度集成到Minecraft中的双向数据转换框架。

你可以将其简单的理解为一个高度智能化的“翻译官”，它的职责是在两种完全不同的“语言”之间进行精确翻译：

- 语言A： 游戏内存中的 `Java 对象 (Object)`。这是程序逻辑可以直接理解和操作的结构。
- 语言B： 用于存储和传输的`数据格式 (Data Format)`，通常是 `JSON` 或 `NBT`。

`Codec` 的本质是定义一套完整的、双向的映射规则，用来规定一个 `Java` 对象是如何被序列化（保存）为 `Json`，以及一个 `Json` 文件是如何被反序列化（加载）成一个 `Java` 对象。

### 1.2 工作流程

`Codec` 的的工作包含两个方向：

1、编码 / 序列化：

- 方向：`Java 对象` -> 某种 `数据格式 (JSON/NBT)`
- 用途：当你需要将游戏中的一个对象保存到玩家的硬盘（如世界存档）或通过网络发送给客户端时。

2、解码 / 反序列化：

- 方向：某种 `数据格式 (JSON/NBT)` -> `Java 对象`
- 用途：当游戏启动或加载资源时，从数据包的 JSON 文件或世界存档的 NBT 中读取数据，并将其转换为游戏逻辑可以使用的对象。

### 1.3 为什么我们要使用 Codec？

在处理数据序列化，特别是 JSON 或 NBT 这类格式时，开发者可能会考虑直接使用如 GSON、Jackson 这样的库，或者手动遍历数据结构进行解析和构建。然而，Minecraft 的 Codec 系统提供了超越这些基本功能的诸多优势，使其成为在 Minecraft 模组开发中更推荐的选择：

- **类型安全**: Codec 强制在编译时就定义数据结构和 Java 类型之间的映射。这大大减少了因类型不匹配或数据格式错误导致的运行时错误。手动解析 JSON 时，很容易因忘记检查字段是否存在、类型是否正确而引入 bug。
- **强大的错误处理**: Codec 的核心是 `DataResult`，它提供了一种优雅的方式来处理解析过程中可能出现的成功、失败以及部分成功的情况。相比手动解析中繁琐的 `try-catch` 和空值检查，`DataResult` 使得错误处理逻辑更清晰、更集中，并且能提供更具上下文的错误信息。
- **双向转换**: 一个 Codec 定义了从 Java 对象到序列化形式（编码）以及从序列化形式到 Java 对象（解码）的双向逻辑。这意味着你只需要定义一次数据结构，就可以同时用于读取和写入，减少了代码冗余和潜在的不一致性。手动处理时，编码和解码逻辑往往是分开实现的。
- **与游戏数据格式的无缝集成**: Codec 通过 `DynamicOps` (如 `JsonOps`, `NbtOps`) 的抽象，使得同一套 Codec 定义可以轻松应用于 JSON、NBT 等多种 Minecraft 常用的数据格式，而无需为每种格式重写解析逻辑。
- **可组合性与可重用性**: Codec 可以像积木一样组合起来。基础类型的 Codec 可以用来构建复杂对象的 Codec (通过 `RecordCodecBuilder`)，列表的 Codec，映射的 Codec 等。这种声明式的方式使得复杂数据结构的定义更为简洁和模块化。
- **数据演进与版本控制**: 作为 DataFixerUpper (DFU) 库的一部分，Codec 的设计初衷就包含了对数据版本迁移的考量。虽然模组开发者可能不直接使用完整的 DFU 框架，但 Codec 本身的设计理念鼓励思考数据的长期演进，并提供了一些机制（如 `optionalFieldOf`、`xmap` 的变体）来处理数据结构的变化。
- **与 Minecraft 核心系统的兼容性**: Minecraft 的许多核心系统，如数据包加载、配方、世界生成、数据组件等，都深度依赖 Codec。使用 Codec 可以确保你的自定义数据与这些系统更好地集成，并能利用游戏提供的验证和加载机制。
虽然对于非常简单、一次性的 JSON 解析任务，手动处理或使用通用库可能看起来更直接，但一旦涉及到需要持久化、网络同步、与游戏系统交互或未来可能需要演进的复杂数据结构，Codec 所提供的结构化、类型安全和错误处理能力将带来巨大的开发效率和代码质量提升。

## 2 Codec 工具包：关键类与接口

Codec 系统由一系列协同工作的类和接口组成，它们共同构成了 Minecraft 数据序列化的基石。

### 2.1 `Codec<A>`：双向转换器

`Codec<A>` 接口定义了一个针对特定类型 `A` 的对象的双向转换逻辑，该逻辑能够普适于任何层级化的序列化格式。它实质上结合了一个 `Encoder<A>`（编码器）和一个 `Decoder<A>`（解码器）的功能。Codec 的实例被设计为不可变的，并且一旦构建完成，通常建议将其存储在静态（static final）字段中，以便复用和确保线程安全。

### 2.2 `DynamicOps<T>`：适配数据格式 (JsonOps, NbtOps)

`DynamicOps<T>` 是层级化序列化格式的适配器：Codec 负责描述“对象结构”，而 DynamicOps 负责描述“输出/输入格式”（JSON/NBT 等）。因此同一个 Codec 可以与不同 DynamicOps 组合使用，实现多格式的复用与互转。

而在模组开发中经常使用的 `DynamicOps<T>` 实现有 `JsonOps` 和 `NbtOps`。

::: tabs

@tab `JsonOps`

作用：DFU 库提供的 JSON 适配器，面向 `GsonJsonElement`。

实例：

- `JsonOps.INSTANCE`：输出标准的 JSON 格式
- `JsonOps.COMPRESSED`：输出压缩为单字符串的 JSON 格式

使用场景：数据包 JSON、自定义配置文件、资源/行为定义等。

@tab `NbtOps`

作用：DFU 库提供的 NBT 适配器，面向 `CompoundTag`。

使用场景：同一份 Codec 既可读写数据包 JSON，也可在网络或存档中用 NBT 表示。例如维度数据在数据包中为 JSON，但网络传输可能为 NBT，此时 NbtOps 提供统一编解码通道。

@tab `RegistryOps`

作用：为 Codec 提供 注册表查找能力（registry lookup），用于解析/序列化注册表中的条目（如方块、生物群系等）。

使用方法：`RegistryOps.create(delegateOps, lookupProvider)` —— 会将“目标格式 Ops + 注册表查找”组合起来。

结构关系：`RegistryOps` 继承 `DelegatingOps`，即本质是对另一个 Ops 的包装/扩展。

@tab `ConditionalOps`

作用：NeoForge 在 `RegistryOps` 基础上扩展，用于处理条件加载（conditions）。

相关机制：NeoForge 支持在 JSON 中声明 `neoforge:conditions`，不满足条件时文件会被丢弃（常见于配方、战利品表、动态注册表等）。

场景：兼容性数据包、可选依赖的内容注册、条件替换等。

@tab `DelegatingOps<T>`

作用：把所有操作委托给内部 delegate 的 DynamicOps，是“包装/扩展”类的基础。

场景：当你需要在原有 Ops 基础上“额外加一层上下文/规则”时使用（例如 `RegistryOps` 就是 DelegatingOps 的典型子类）。

@tab `NullOps` && `JavaOps`

&emsp;&emsp;除了常见的 `JsonOps` 与 `NbtOps`，Minecraft 体系里还有一些更偏“运行时/上下文”的 `DynamicOps` 实现。它们的作用不是改变 Codec 的定义，而是改变 Codec 所落地的数据形态，从而适配不同的读写场景。

&emsp;&emsp;其中 NullOps 可以理解为“空输出 / 丢弃型”的 Ops。它的目标类型是 Unit，所有 create* 方法都会返回 Unit.INSTANCE，empty() / emptyMap() / emptyList() 也只给 Unit.INSTANCE，等价于“不产生任何实际序列化结果”。同时，所有读取类方法都会直接报错（例如 getNumberValue / getMap / getList 都返回 DataResult.error）。也就是说，NullOps 仍能让 Codec 的流程跑完，但不会保留任何数据。这种实现常用于只做“结构校验”或刻意丢弃输出的场景。

&emsp;&emsp;与之相对，JavaOps 是“纯 Java 运行时对象”的 Ops。它将序列化结构映射为 Java 的 Map / List / 基本类型对象。

:::

<ImageCard
    image='/images/DynamicOps.png'
    title="各种DynamicOps实现"
/>

### 2.3 `DataResult<A>`：处理结果与错误

&emsp;&emsp;使用 `Codec` 进行编码或解码操作后，返回的是一个 `DataResult<A>` 对象。该对象封装了转换操作的结果，其中可能包含成功转换的实例，或者在转换失败时包含错误数据。`DataResult` 可以表示成功或失败状态，其 `resultOrPartial` 方法在处理自定义数据包（datapack）资源等场景时特别有用，它允许在记录错误的同时，仍可能获取部分成功转换的结果。

## 3 如何构建 Codec

构建复杂的 Codec 通常始于对基本数据类型和常见集合类型的处理。

### 3.1 基本类型的 Codec (String, Int, Bool 等)

&emsp;&emsp;Mojang 提供了用于处理 Java 基本数据类型及其包装类的内置 Codec，例如 `Codec.BOOL`、`Codec.INT`、`Codec.STRING`、`Codec.FLOAT` 等。这些是构建更复杂 Codec 的基础构件。

&emsp;&emsp;因为本篇教程我是基于Neoforge开发角度，所以你可以在Neoforge官方的[Wiki](https://docs.neoforged.net/docs/datastorage/codecs/#existing-codecs)中找到更多的Codec类型。

### 3.2 使用 `RecordCodecBuilder` 定义复杂数据

对于具有明确命名字段的自定义类或 Java 记录（Record），`RecordCodecBuilder` 是创建其 Codec 的主要工具。

#### 3.2.1 构建自定义对象和记录的结构

`RecordCodecBuilder` 是为具有显式命名字段的类或 Java Record 创建 Codec 的核心工具。它允许通过 `instance.group(...)` 方法定义多个字段。Java Record 因其固有的不可变性和简洁性而特别适合与 `RecordCodecBuilder` 配合使用。

#### 3.2.2 定义字段：`fieldOf()` 与 `forGetter()`

&emsp;&emsp;在 `RecordCodecBuilder.group(...)`内部，每个字段都通过其类型的 `Codec`、后跟 `.fieldOf("json_key_name")`（指定序列化格式中的键名）以及 `.forGetter(MyClass::getFieldName)`（提供用于序列化的 getter 函数）来定义。这些方法将 Java 字段（通过其 getter 和类型的 Codec）与其在序列化数据中的表示（键名）关联起来。

```Java
// 假设有一个 Java Record:
// public record MyData(String name, int value) {}

// MyData 的 Codec
public static final Codec MY_DATA_CODEC = RecordCodecBuilder.create(instance ->
    instance.group(
        Codec.STRING.fieldOf("name").forGetter(MyData::name),
        Codec.INT.fieldOf("value").forGetter(MyData::value)
    ).apply(instance, MyData::new)
);
```

#### 3.2.3 处理可选性：optionalFieldOf() 与默认值

&emsp;&emsp;为了处理数据中可能缺失的字段，可以使用 `someCodec.optionalFieldOf("field_name")` 来创建一个对应 `Optional<Type>` 类型的字段。如果希望在字段缺失时提供一个默认值，则可以使用 `someCodec.optionalFieldOf("field_name", defaultValue)`。需要注意的是，如果一个可选字段存在但数据格式错误，~~错误可能会被静默捕获，并使用默认值代替~~ **(现在一个字段存在但是解析失败，会报错了，此时需要使用 `lenientOptionalFieldOf`)**。若希望在可选元素解析出错时消费掉该错误，可以使用 `lenientOptionalFieldOf`。

```Java
// 假设有一个 Java Record:
// public record ConfigData(String id, Optional description, int timeout) {}

// ConfigData 的 Codec
public static final Codec CONFIG_DATA_CODEC = RecordCodecBuilder.create(instance ->
    instance.group(
        Codec.STRING.fieldOf("id").forGetter(ConfigData::id),
        Codec.STRING.optionalFieldOf("description").forGetter(ConfigData::description), // 返回 Optional
        Codec.INT.optionalFieldOf("timeout", 30).forGetter(ConfigData::timeout) // 如果缺失，timeout 默认为 30
    ).apply(instance, ConfigData::new)
);
```

### 3.3 转换与组合 Codec

Codec 系统提供了强大的组合与转换能力，让你可以在已有 Codec 的基础上构建更复杂的数据结构，或对字段做类型映射、校验与多态分发。

#### 3.3.1 类型间映射：`xmap()` 及其变体 (`flatXMap`, `comapFlatMap`)

当你需要在两种类型之间做转换时，可以用 xmap 系列方法。核心思想是：

- `xmap`：两个方向都不会失败的映射。
- `flatXMap`：两个方向都有可能失败，这会返回 `DataResult`。
- `comapFlatMap`：解码方向可能失败（`A -> B` 可能失败），编码方向安全。
- `flatComapMap`：编码方向可能失败（`B -> A` 可能失败），解码方向安全。

#### 3.3.2 实现多态分发：`Codec.dispatch()`

当一个字段代表 “多种子类型中的一种” 时，可以用 dispatch 进行多态分发。思路是：

- 数据里有一个 “类型字段”，如 type；
- 先根据 `type` 取到子类型；
- 再选择对应子类型 Codec 进行编解码。

这非常适合 “可扩展配置” “多种子类配置” 的场景。

#### 3.3.3 组合 `Codec.pair()` 与 `Codec.either()`

- `pair`：在同一份数据上依次解两个值，得到一个二元组；适合“组合多个字段”的场景。
- `either`：先尝试第一个 Codec；若失败再尝试第二个，适合“多种结构都允许”的场景。

## 4 Codec 在Minecraft （Neoforge、Fabric） 生态中的应用

随着 Minecraft 版本的迭代，Codec 的应用范围不断扩大，深入到模组开发的各个方面。

::: tabs

@tab 数据组件

&emsp;&emsp;数据组件（Data Components）是 Minecraft 1.20.5 版本引入的一项重要特性，用以替代旧的 `ItemStack NBT` 系统来存储物品栈的附加数据。Codec 在定义这些自定义数据组件的持久化和网络同步方式方面起着核心作用。

对于 NeoForge，数据组件将数据作为实际对象存储在物品栈上。定义一个 `DataComponentType` 时，需要为其提供一个用于持久化的 Codec（通过 `.persistent()` 方法指定）和/或一个用于网络同步的 `StreamCodec`（通过 `.networkSynchronized()` 方法指定）。`RecordCodecBuilder` 是创建这些 Codec 的常用工具。

@tab 自定义配方序列化器

&emsp;&emsp;模组可以通过自定义配方序列化器（Recipe Serializer）来定义全新的合成机制或处理类型，这些通常具有自定义的 JSON 结构。Codec 在此过程中负责解析这些 JSON 并将其转换为游戏逻辑中可用的 Java 对象。

&emsp;&emsp;对于 NeoForge，自定义的 `RecipeSerializer` 需要提供一个 `MapCodec` 用于 JSON 的序列化和反序列化，以及一个 `StreamCodec` 用于网络同步。通常使用 `RecordCodecBuilder.mapCodec(...)` 来创建所需的 MapCodec。

@tab 网络数据包序列化

&emsp;&emsp;为了实现高效的网络通信，Minecraft 使用 `StreamCodec<B, V>`（其中 B 通常是 ByteBuf 或 RegistryFriendlyByteBuf）进行数据包内容的序列化和反序列化。它与用于磁盘/JSON 序列化的通用 `Codec<T>` 是不同的。`DataComponentType.Builder` 接受一个 `StreamCodec` 用于 `networkSynchronized` 配置。`RecipeSerializer` 同样需要一个 `StreamCodec`。

:::

> [!tip]
> `StreamCodec` 与 `MapCodec` 的区分
>
> - `MapCodec` 用于结构化数据（通常是 JSON），适合定义 “键值对字段” 的数据结构。
> - `StreamCodec` 用于网络同步（基于 ByteBuf/RegistryFriendlyByteBuf）。
>   - 典型场景：自定义配方序列化器会同时要求 `MapCodec`（JSON 数据包）和 `StreamCodec`（网络同步）；数据组件也常同时需要持久化与网络同步的编解码器。
