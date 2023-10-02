import { addons } from "@storybook/addons"
import { create } from "@storybook/theming/create"

addons.setConfig({
    theme: create({
        base: "light",
        brandTitle: "Kiwi Components",
        brandUrl: "https://fukurosan.github.io/kiwicomponents/",
//        brandImage: "https://fukurosan.github.io/kiwicomponents/img/logo.png"
    })
})
