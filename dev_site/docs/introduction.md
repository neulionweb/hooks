# Introduction
<p className="lead">Learn how to use</p>

### Installation
```cmd
npm install @neuweb/hooks --save
```

### Use
```jsx
import {useIsUnmounted} from '@neuweb/hooks';
```

### Examples
```jsx
const isUnmounted = useIsUnmounted();

useEffect(() => {
  getVideoDetail().then((video) => {
    if (isUnmounted) return;

    handleVideo(video);
  });
}, []);
```
