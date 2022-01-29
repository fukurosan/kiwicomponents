# Scrollbars

Kiwi Components comes with easily configurable scrollbars that can either be applied globally inside your project, or used to modify only the components of this library themselves.

The scrollbar implementation differs greatly between browsers. There is a W3C proposal for scrollbars that can be found [here](https://www.w3.org/TR/css-scrollbars-1/), but it is implemented to various degrees in browsers. Chromium/Webkit in particular allows for additional styling of scrollbars that goes far beyond the current proposal, however this unfortunately means uer experience that differs between platforms. Kiwi Components allows you both apply similar styles to both browsers, as well as use special Chromium/Webkit settings for Chromium/Webkit users. 

It should be noted that the above W3C specification explicitly states: _"Exposing the scrollbar-related ::-webkit- prefixed pseudo-elements to the Web is considered a mistake by both the CSS Working Group and Webkit."_. Implementing such scrollbar settings should in other words be done at your own risk.


## Enabling Global Scrollbars

To enable the global scrollbars you can use the injectStyle function, and set scrollbars to true.

```javascript
import { injectStyle } from "kiwicomponents"
kiwicomponents.injectStyle({
	scrollbars: true
})
```

## CSS Variables

You can configure the scrollbars using CSS variables defined on the :root selector. If global scrollbars styles have been injected then they will apply to all elements in your project, otherwise only components of this library.

The following CSS variables can be set:

| Variable                                     | Description                                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| --kiwi-scrollbar-width                       | Width for non-Chromium/Webkit browsers (can be set to thin, none or auto)                                            |
| --kiwi-scrollbar-thumb-color                 | Thumb color for all browsers                                                                                         |
| --kiwi-scrollbar-track-color                 | Track color for all browsers                                                                                         |
| --kiwi-scrollbar-width-webkit                | Width for Chromium/Webkit browsers, usually set a pixels (9px is roughly the same as "thin" for standard scrollbars) |
| --kiwi-scrollbar-thumb-radius                | Thumb radius (Chromium/Webkit only)                                                                                  |
| --kiwi-scrollbar-thumb-boxshadow             | Box shadow (Chromium/Webkit only)                                                                                    |
| --kiwi-scrollbar-thumb-border                | Border (Chromium/Webkit only)                                                                                        |
| --kiwi-scrollbar-track-backgroundsize        | Background size on hover (Chromium/Webkit only)                                                                      |
| --kiwi-scrollbar-thumb-radius-hover          | Thumb radius on hover (Chromium/Webkit only)                                                                         |
| --kiwi-scrollbar-thumb-boxshadow-hover       | Box shadow on hover (Chromium/Webkit only)                                                                           |
| --kiwi-scrollbar-thumb-border-hover          | Border on hover (Chromium/Webkit only)                                                                               |
| --kiwi-scrollbar-track-backgroundsize-hover  | Background size on hover (Chromium/Webkit only)                                                                      |
| --kiwi-scrollbar-thumb-radius-active         | Thumb radius on active (Chromium/Webkit only)                                                                        |
| --kiwi-scrollbar-thumb-boxshadow-active      | Box shadow on active (Chromium/Webkit only)                                                                          |
| --kiwi-scrollbar-thumb-border-active         | Border on active (Chromium/Webkit only)                                                                              |
| --kiwi-scrollbar-track-backgroundsize-active | Background size on active (Chromium/Webkit only)                                                                     |
