# Framer Motion

- React 애플리케이션에서 애니메이션을 쉽게 구현할 수 있는 라이브러리.
- props를 사용하여 애니메이션 효과를 적용할 수 있다.

[Framer Motion 공식문서](https://www.framer.com/motion/)

# 설치

```bash
npm install framer-motion
```

# 사용법

- motion 오브젝트에서 태그를 불로온다.

```tsx
import { motion } from 'framer-motion';

<motion.div />;
```

- 이렇게 motion 키워드가 붙은 요소를 `motion component` 라고 한다.

## styled-components와 함께 사용

```tsx
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}
```

## props 사용

- Framer Motion 컴포넌트는 다양한 props를 통해 애니메이션을 제어한다.

```tsx
function App() {
  return (
    <Wrapper>
      <Box transition={{ delay: 3 }} animate={{ borderRadius: '100px' }} />
    </Wrapper>
  );
}
```

# 기능

## 1. Animation

- 간단한 애니메이션의 경우 animate props에서 직접 값을 설정할 수 있다.

```tsx
<motion.div animate={{ x: 100 }} />
```

- initial: 애니메이션의 초기 상태를 설정한다.
- animate: 애니메이션의 최종 상태를 설정한다.
- transition: 애니메이션의 전환 효과를 설정한다.

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  }}
/>
```

### Enter animations

- motion 컴포넌트가 처음 생성될 때, animate 속성에 적용된 값이 style 또는 initial 에 정의된 값과 다르다면
- animate 속성에 적용된 값으로 자동으로 애니메이션을 적용해 준다.
- 자동으로 적용하길 원치 않는다면 initㅑal 값을 false로 설정해 준다.

```tsx
<motion.div animate={{ x: 100 }} initial={false} />
```

### Exit animations

- 리액트에서는 컴포넌트가 트리에서 삭제될 경우 “즉시” 사라져버리기 때문에 사라지는 애니메이션을 적용하기 어렵다는 문제가 있다.
- [AnimatePresence](https://www.framer.com/motion/animate-presence/) 컴포넌트를 사용하면 사라지는 애니메이션이 보여지는 동안 DOM에 유지되도록 할 수 있다.

```tsx
const MyComponent = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </AnimatePresence>
);
```

> modal과 같은 반복적인 요소에는 추적가능한 key값이 필요하다.

## 2. [Variants](https://www.framer.com/motion/animation/#variants)

- 단일 객체에 애니메이션을 구성하는 것은 animate props로 간단하다.
- 그런데 DOM 전체에 파생되는 애니메이션이나, 차례로 이뤄지는 애니메이션을 설정하고 싶을 때는 어떻게 해야할까?
- 그럴 때는 variants(변형)를 사용한다. 미리 정의한 애니메이션 세트라고 할 수 있다.

```tsx
const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0 },
};

return items.map((item, i) => (
  <motion.li custom={i} animate="visible" variants={variants} />
));
```

### 상속

- 만약 motion 컴포넌트에 자식 요소가 있다면, 자식 요소가 자체 animate 속성을 정의하기 전까지 variants의 변화를 상속받도록 할 수 있다.
- 쉽게 말해, variants에 정의한 속성명을 자식에게 그대로 물려줄 수 있다.

```tsx
const list = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const item = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

return (
  <motion.ul initial="hidden" animate="visible" variants={list}>
    <motion.li variants={item} />
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
);
```

- li에 달린 variants={item}은 initial="hidden"과 animate="visible"가 자동으로 적용된다.

## 3. Gestures

Framer Motion은 다양한 제스처 기반의 애니메이션을 제공한다.

- Hover: 컴포넌트 위로 마우스가 올라갔을 때의 애니메이션
- Tap: 컴포넌트를 클릭했을 때의 애니메이션
- Drag: 컴포넌트를 드래그 했을 때의 애니메이션

```tsx
<motion.div
  initial={{ opacity: 0.2 }}
  // 화면에 보이면 동작
  whileInView={{
    opacity: 1,
    rotate: [0, 360],
    borderRadius: ['20%', '50%'],
    transition: { delay: 0.05 },
  }}
  // 호버되면 동작
  whileHover={{
    scale: 1.2,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  }}
  // 클릭되면 동작
  whileTap={{ scale: 0.9 }}
/>
```

## 4. Layout

- 레이아웃의 변경을 감지하고 자동으로 애니메이션 효과를 적용해준다.
- layout prop을 해당 컴포넌트에 추가하면 된다.

```tsx
import { motion } from 'framer-motion';

function ExampleComponent({ isExpanded }) {
  return (
    <motion.div layout style={{ height: isExpanded ? 300 : 100 }}>
      Content here
    </motion.div>
  );
}
```

- 위의 예제에서 isExpanded prop 값에 따라 높이가 변경되는데, layout prop으로 높이 변경 시 자연스러운 애니메이션 효과가 적용된다.

### AnimateSharedLayout

- `AnimateSharedLayout` 및 `layoutId`를 사용하여 두 다른 컴포넌트 간의 레이아웃 애니메이션을 공유할 수 있다.

```tsx
<Wrapper>
  <Grid>
    {['1', '2', '3', '4'].map((n) => (
      <Box onClick={() => setId(n)} key={n} layoutId={n} />
    ))}
  </Grid>
  <AnimatePresence>
    {id ? (
      <Overlay
        variants={overlay}
        onClick={() => setId(null)}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Box layoutId={id} style={{ width: 200, height: 200 }} />
      </Overlay>
    ) : null}
  </AnimatePresence>
</Wrapper>
```

![](https://velog.velcdn.com/images/sarang_daddy/post/11ad8d05-2f22-4c27-a0be-a479b8d7b4f6/image.gif)
