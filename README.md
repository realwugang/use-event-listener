# @hooooks/use-event-listener

A custom React Hook that provides a declarative useEventListener.

## Installation

```bash
$ npm i @hooooks/use-event-listener
```

or

```bash
$ yarn add @hooooks/use-event-listener
```

## Usage

Here is a basic setup.

```js
useEventListener(element, eventName, handler, options);
```

## Example

```tsx
import { useRef } from 'react'
import useEventListener from '@hooooks/use-event-listener'

function App () {
  const containerRef = useRef<HTMLElement>()
  const scrollContentRef = useRef<HTMLElement>()

  useEventListener(window, 'resize', () => {
    console.log('resize')
  })

  useEventListener(document, 'visibilityChange', hidden => {
    console.log('hidden', hidden)
  }, false)

  useEventListener(containerRef, 'contextmenu', () => {
    console.log('contextmenu')
  })

  useEventListener(scrollContentRef, 'touchstart', () => {
    console.log('touchstart')
  }, {
    passive: true
  })

  return (
    <div className='container' ref={containerRef}>
      <div className='content' ref={scrollContentRef}></div>
    </div>
  )
}
```
### Parameters

Here are the parameters that you can use. (\* = optional)

| Parameter   | Description                                                                                                                                                                                                                            |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element` | The element `Window \| Document \| HTMLElement \| Ref<HTMLElement \| ReactInstance>` to listen on. |
| `eventName` | The event name (string). Here is a list of [common events](https://developer.mozilla.org/en-US/docs/Web/Events).|
| `handler`   | A function that will be called whenever `eventName` fires on .|                                                                                                                                                                                                                                                               
| `options`\* | An object `{ capture?: boolean, passive?: boolean, once?: boolean }` or boolean to be passed to `addEventListener`. Defaults to `false` For advanced use cases. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) for details. |


## License

**[MIT](LICENSE)** Licensed


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->


