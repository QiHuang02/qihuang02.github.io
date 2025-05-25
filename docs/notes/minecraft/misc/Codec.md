---
title: Codec
createTime: 2025/05/25 07:53:37
permalink: /notes/minecraft/misc/codec/
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

有些开发者可能会想：“我自己用 GSON 或其他库手动解析JSON不也可以吗？” 答案是可以，但这是一种非常脆弱、低效且容易出错的方式。

## 2 Codec 工具包：关键类与接口

Codec 系统由一系列协同工作的类和接口组成，它们共同构成了 Minecraft 数据序列化的基石。

### 2.1 `Codec<A>`：双向转换器

`Codec<A>` 接口定义了一个针对特定类型 `A` 的对象的双向转换逻辑，该逻辑能够普适于任何层级化的序列化格式。它实质上结合了一个 `Encoder<A>`（编码器）和一个 `Decoder<A>`（解码器）的功能。Codec 的实例被设计为不可变的，并且一旦构建完成，通常建议将其存储在静态（static final）字段中，以便复用和确保线程安全。

### 2.2 `DynamicOps<T>`：适配数据格式 (JsonOps, NbtOps)

`DynamicOps<T>` 扮演着层级化序列化格式（例如 JSON、NBT）的适配器角色。它允许从底层序列化形式中提取和插入简单数据类型。常见的实现有用于处理 JSON 数据的 `JsonOps` 和用于处理 NBT 数据的 `NbtOps`。Codec 通常与一个 `DynamicOps` 实例协同工作，以完成实际的编解码操作。

<ImageCard
    image='/images/DynamicOps.png'
    title="各种DynamicOps实现"
/>

### 2.3 `DataResult<A>`：处理结果与错误

使用 `Codec` 进行编码或解码操作后，返回的是一个 `DataResult<A>` 对象。该对象封装了转换操作的结果，其中可能包含成功转换的实例，或者在转换失败时包含错误数据。`DataResult` 可以表示成功或失败状态，其 `resultOrPartial` 方法在处理自定义数据包（datapack）资源等场景时特别有用，它允许在记录错误的同时，仍可能获取部分成功转换的结果。

## 3 如何构建 Codec

构建复杂的 Codec 通常始于对基本数据类型和常见集合类型的处理。

### 3.1 基本类型的 Codec (String, Int, Bool 等)

Mojang 提供了用于处理 Java 基本数据类型及其包装类的内置 Codec，例如 `Codec.BOOL`、`Codec.INT`、`Codec.STRING`、`Codec.FLOAT` 等。这些是构建更复杂 Codec 的基础构件。

因为本篇教程我是基于Neoforge开发角度，所以你可以在Neoforge官方的[Wiki](https://docs.neoforged.net/docs/datastorage/codecs/#existing-codecs)中找到更多的Codec类型。

### 3.2 使用 `RecordCodecBuilder` 定义复杂数据

对于具有明确命名字段的自定义类或 Java 记录（Record），`RecordCodecBuilder` 是创建其 Codec 的主要工具。

#### 3.2.1 构建自定义对象和记录的结构

`RecordCodecBuilder` 是为具有显式命名字段的类或 Java Record 创建 Codec 的核心工具。它允许通过 `instance.group(...)` 方法定义多个字段。Java Record 因其固有的不可变性和简洁性而特别适合与 `RecordCodecBuilder` 配合使用。

#### 3.2.2 定义字段：`fieldOf()` 与 `forGetter()`

在 `RecordCodecBuilder.group(...)`内部，每个字段都通过其类型的 `Codec`、后跟 `.fieldOf("json_key_name")`（指定序列化格式中的键名）以及 `.forGetter(MyClass::getFieldName)`（提供用于序列化的 getter 函数）来定义。这些方法将 Java 字段（通过其 getter 和类型的 Codec）与其在序列化数据中的表示（键名）关联起来。

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

为了处理数据中可能缺失的字段，可以使用 `someCodec.optionalFieldOf("field_name")` 来创建一个对应 `Optional<Type>` 类型的字段。如果希望在字段缺失时提供一个默认值，则可以使用 `someCodec.optionalFieldOf("field_name", defaultValue)`。需要注意的是，如果一个可选字段存在但数据格式错误，错误可能会被静默捕获，并使用默认值代替。若希望在可选元素解析出错时消费掉该错误，可以使用 `lenientOptionalFieldOf`。

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

Codec 系统提供了强大的机制来转换现有 Codec 以适应新的数据类型，或将多个 Codec 组合成更复杂的结构。

#### 3.3.1 类型间映射：xmap() 及其变体 (flatXMap, comapFlatMap)

WIP

#### 3.3.2 实现多态分发：Codec.dispatch()

WIP

#### 3.3.3 组合 Codec：Codec.pair() 与 Codec.either()

WIP

## 4 Codec 在Minecraft （Neoforge、Fabric） 生态中的应用

随着 Minecraft 版本的迭代，Codec 的应用范围不断扩大，深入到模组开发的各个方面。

::: tabs

@tab 数据组件

数据组件（Data Components）是 Minecraft 1.20.5 版本引入的一项重要特性，用以替代旧的 `ItemStack NBT` 系统来存储物品栈的附加数据。Codec 在定义这些自定义数据组件的持久化和网络同步方式方面起着核心作用。

对于 NeoForge，数据组件将数据作为实际对象存储在物品栈上。定义一个 `DataComponentType` 时，需要为其提供一个用于持久化的 Codec（通过 `.persistent()` 方法指定）和/或一个用于网络同步的 `StreamCodec`（通过 `.networkSynchronized()` 方法指定）。`RecordCodecBuilder` 是创建这些 Codec 的常用工具。

@tab 自定义配方序列化器

模组可以通过自定义配方序列化器（Recipe Serializer）来定义全新的合成机制或处理类型，这些通常具有自定义的 JSON 结构。Codec 在此过程中负责解析这些 JSON 并将其转换为游戏逻辑中可用的 Java 对象。

对于 NeoForge，自定义的 `RecipeSerializer` 需要提供一个 `MapCodec` 用于 JSON 的序列化和反序列化，以及一个 `StreamCodec` 用于网络同步。通常使用 `RecordCodecBuilder.mapCodec(...)` 来创建所需的 MapCodec。

@tab 网络数据包序列化

为了实现高效的网络通信，Minecraft 使用 `StreamCodec<B, V>`（其中 B 通常是 ByteBuf 或 RegistryFriendlyByteBuf）进行数据包内容的序列化和反序列化。它与用于磁盘/JSON 序列化的通用 `Codec<T>` 是不同的。`DataComponentType.Builder` 接受一个 `StreamCodec` 用于 `networkSynchronized` 配置。`RecipeSerializer` 同样需要一个 `StreamCodec`。

:::
