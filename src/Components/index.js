import { KiwiAccordion } from "./Accordion/kiwi-accordion"
import { KiwiAlert } from "./Alert/kiwi-alert"
import { KiwiBurgerMenu } from "./BurgerMenu/kiwi-burger"
import { KiwiButton } from "./Button/kiwi-button"
import { KiwiDrawer } from "./Drawer/kiwi-drawer"
import { KiwiMenuElement } from "./Menu/kiwi-menu/kiwi-menu"
import { KiwiMenuItemElement } from "./Menu/kiwi-menu-item/kiwi-menu-item"
import { KiwiNavbar } from "./Navbar/kiwi-navbar/kiwi-navbar"
import { KiwiNavbarItem } from "./Navbar/kiwi-navbar-item/kiwi-navbar-item"
import { KiwiScrollListElement } from "./ScrollList/kiwi-scroll-list"
import { KiwiSpinner } from "./Spinner/kiwi-spinner"
import { KiwiTableElement } from "./Table/kiwi-table"
import { KiwiTabs } from "./Tabs/kiwi-tabs"
import { KiwiToastElement } from "./Toast/kiwi-toast/kiwi-toast"
import { KiwiToastContainer } from "./Toast/kiwi-toast-container/kiwi-toast-container"
import { KiwiTooltipElement } from "./Tooltip/kiwi-tooltip"
import { KiwiTreeListItem } from "./Tree/kiwi-treelist-item"
import { KiwiWindowElement } from "./Window/kiwi-window"

function define(name, element) {
	if (!window || !window.customElements || window.customElements.get(name)) {
		return null
	}
	window.customElements.define(name, element)
}

export const Components = {
	Accordion: () => define("kiwi-accordion", KiwiAccordion),
	Alert: () => define("kiwi-alert", KiwiAlert),
	Burger: () => define("kiwi-burger", KiwiBurgerMenu),
	Button: () => define("kiwi-button", KiwiButton),
	Drawer: () => define("kiwi-drawer", KiwiDrawer),
	Menu: () => (define("kiwi-menu", KiwiMenuElement), define("kiwi-menu-item", KiwiMenuItemElement)),
	Navbar: () => (define("kiwi-navbar", KiwiNavbar), define("kiwi-navbar-item", KiwiNavbarItem)),
	ScrollList: () => define("kiwi-scroll-list", KiwiScrollListElement),
	Spinner: () => define("kiwi-spinner", KiwiSpinner),
	Table: () => define("kiwi-table", KiwiTableElement),
	Tabs: () => define("kiwi-tabs", KiwiTabs),
	Toast: () => (define("kiwi-toast", KiwiToastElement), define("kiwi-toast-container", KiwiToastContainer)),
	Tooltip: () => define("kiwi-tooltip", KiwiTooltipElement),
	Tree: () => define("kiwi-treelist-item", KiwiTreeListItem),
	Window: () => define("kiwi-window", KiwiWindowElement)
}

export const init = () => {
	define("kiwi-accordion", KiwiAccordion)
	define("kiwi-alert", KiwiAlert)
	define("kiwi-burger", KiwiBurgerMenu)
	define("kiwi-button", KiwiButton)
	define("kiwi-drawer", KiwiDrawer)
	define("kiwi-menu", KiwiMenuElement)
	define("kiwi-menu-item", KiwiMenuItemElement)
	define("kiwi-navbar", KiwiNavbar)
	define("kiwi-navbar-item", KiwiNavbarItem)
	define("kiwi-scroll-list", KiwiScrollListElement)
	define("kiwi-spinner", KiwiSpinner)
	define("kiwi-table", KiwiTableElement)
	define("kiwi-tabs", KiwiTabs)
	define("kiwi-toast", KiwiToastElement)
	define("kiwi-toast-container", KiwiToastContainer)
	define("kiwi-tooltip", KiwiTooltipElement)
	define("kiwi-treelist-item", KiwiTreeListItem)
	define("kiwi-window", KiwiWindowElement)
}