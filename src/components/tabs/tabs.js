import '../../vendor/polyfills/Function/prototype/bind'
import '../../vendor/polyfills/Element/prototype/classList'
import '../../vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../common'

function Tabs ($module) {
  this.$module = $module
  this.$tabs = $module.querySelectorAll('.govuk-tabs__tab')

  this.keys = { left: 37, right: 39, up: 38, down: 40 }
  this.jsHiddenClass = 'js-hidden'
}

Tabs.prototype.init = function () {
  if (typeof window.matchMedia === 'function') {
    this.setupResponsiveChecks()
  } else {
    this.setup()
  }
}

Tabs.prototype.setupResponsiveChecks = function () {
  this.mql = window.matchMedia('(min-width: 40.0625em)')
  this.mql.addListener(this.checkMode.bind(this))
  this.checkMode(this.mql)
}

Tabs.prototype.checkMode = function (mql) {
  if (this.mql.matches) {
    this.setup()
  } else {
    this.teardown()
  }
}

Tabs.prototype.setup = function () {
  var $module = this.$module
  var $tabs = this.$tabs
  var $tabList = $module.querySelector('.govuk-tabs__list')
  var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item')

  if (!$tabs || !$tabList || !$tabListItems) {
    return
  }

  $tabList.setAttribute('role', 'tablist')

  nodeListForEach($tabListItems, function ($item) {
    $item.setAttribute('role', 'presentation')
  })

  nodeListForEach($tabs, function ($tab) {
    // Set HTML attributes
    this.setAttributes($tab)

    // Handle events
    $tab.addEventListener('click', this.onTabClick.bind(this))
    $tab.addEventListener('keydown', this.onTabKeydown.bind(this))
  }.bind(this))

  // If there's a tab that matches the hash
  var $activeTab = this.getTab(window.location.hash)
  if ($activeTab) {
    this.highlightTab($activeTab)
    this.showPanel($activeTab)
  } else {
    // or show the first
    var firstTab = this.$tabs[0]
    this.highlightTab(firstTab)
    this.showPanel(firstTab)
  }

  // Handle hashchange events
  window.addEventListener('hashchange', this.onHashChange.bind(this))
}

Tabs.prototype.teardown = function () {
  var $module = this.$module
  var $tabs = this.$tabs
  var $tabList = $module.querySelector('.govuk-tabs__list')
  var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item')

  if (!$tabs || !$tabList || !$tabListItems) {
    return
  }

  $tabList.removeAttribute('role')

  nodeListForEach($tabListItems, function ($item) {
    $item.removeAttribute('role', 'presentation')
  })

  nodeListForEach($tabs, function ($tab) {
    // Remove events
    $tab.removeEventListener('click', this.onTabClick)
    $tab.removeEventListener('keydown', this.onTabKeydown)

    // Unset HTML attributes
    this.unsetAttributes($tab)
  }.bind(this))

  // Remove hashchange event handler
  window.removeEventListener('hashchange', this.onHashChange)
}

Tabs.prototype.onHashChange = function (e) {
  var hash = window.location.hash
  if (!this.hasTab(hash)) {
    return
  }
  if (this.changingHash) {
    this.changingHash = false
    return
  }
  var $tab = this.getTab(window.location.hash)
  var $currentTab = this.getCurrentTab()
  if ($tab) {
    this.hideTab($currentTab)
    this.showTab($tab)
    $tab.focus()
  } else {
    var $firstTab = this.$tabs.firstElementChild
    this.hideTab($currentTab)
    this.showTab($firstTab)
    $firstTab.focus()
  }
}

Tabs.prototype.hasTab = function (hash) {
  return this.$module.querySelector(hash)
}

Tabs.prototype.hideTab = function ($tab) {
  this.unhighlightTab($tab)
  this.hidePanel($tab)
}

Tabs.prototype.showTab = function ($tab) {
  this.highlightTab($tab)
  this.showPanel($tab)
}

Tabs.prototype.getTab = function (hash) {
  return this.$module.querySelector('a[role="tab"][href="' + hash + '"]')
}

Tabs.prototype.setAttributes = function ($tab) {
  // set tab attributes
  var panelId = this.getHref($tab).slice(1)
  $tab.id = 'tab_' + panelId
  $tab.setAttribute('role', 'tab')
  $tab.setAttribute('aria-controls', panelId)
  $tab.setAttribute('tabindex', '-1')

  // set panel attributes
  var $panel = this.getPanel($tab)
  $panel.setAttribute('role', 'tabpanel')
  $panel.setAttribute('aria-labelledby', $tab.id)
  $panel.classList.add(this.jsHiddenClass)
}

Tabs.prototype.unsetAttributes = function ($tab) {
  // unset tab attributes
  $tab.removeAttribute('id')
  $tab.removeAttribute('role')
  $tab.removeAttribute('aria-controls')
  $tab.removeAttribute('tabindex')

  // unset panel attributes
  var $panel = this.getPanel($tab)
  $panel.removeAttribute('role')
  $panel.removeAttribute('aria-labelledby')
  $panel.classList.remove(this.jsHiddenClass)
}

Tabs.prototype.onTabClick = function (e) {
  e.preventDefault()
  var $newTab = e.target
  var $currentTab = this.getCurrentTab()
  this.hideTab($currentTab)
  this.showTab($newTab)
  this.createHistoryEntry($newTab)
}

Tabs.prototype.createHistoryEntry = function ($tab) {
  var $panel = this.getPanel($tab)
  var id = $panel.id
  $panel.id = ''
  this.changingHash = true
  window.location.hash = this.getHref($tab).slice(1)
  $panel.id = id
}

Tabs.prototype.onTabKeydown = function (e) {
  switch (e.keyCode) {
    case this.keys.left:
    case this.keys.up:
      this.activatePreviousTab()
      e.preventDefault()
      break
    case this.keys.right:
    case this.keys.down:
      this.activateNextTab()
      e.preventDefault()
      break
  }
}

Tabs.prototype.activateNextTab = function () {
  var currentTab = this.getCurrentTab()
  var nextTabListItem = currentTab.parentNode.nextElementSibling
  if (nextTabListItem) {
    var nextTab = nextTabListItem.firstElementChild
  }
  if (nextTab) {
    this.hideTab(currentTab)
    this.showTab(nextTab)
    nextTab.focus()
    this.createHistoryEntry(nextTab)
  }
}

Tabs.prototype.activatePreviousTab = function () {
  var currentTab = this.getCurrentTab()
  var previousTabListItem = currentTab.parentNode.previousElementSibling
  if (previousTabListItem) {
    var previousTab = previousTabListItem.firstElementChild
  }
  if (previousTab) {
    this.hideTab(currentTab)
    this.showTab(previousTab)
    previousTab.focus()
    this.createHistoryEntry(previousTab)
  }
}

Tabs.prototype.getPanel = function ($tab) {
  var $panel = this.$module.querySelector(this.getHref($tab))
  return $panel
}

Tabs.prototype.showPanel = function ($tab) {
  var $panel = this.getPanel($tab)
  $panel.classList.remove(this.jsHiddenClass)
}

Tabs.prototype.hidePanel = function (tab) {
  var $panel = this.getPanel(tab)
  $panel.classList.add(this.jsHiddenClass)
}

Tabs.prototype.unhighlightTab = function ($tab) {
  $tab.setAttribute('aria-selected', 'false')
  $tab.setAttribute('tabindex', '-1')
}

Tabs.prototype.highlightTab = function ($tab) {
  $tab.setAttribute('aria-selected', 'true')
  $tab.setAttribute('tabindex', '0')
}

Tabs.prototype.getCurrentTab = function () {
  return this.$module.querySelector('[role=tab][aria-selected=true]')
}

// this is because IE doesn't always return the actual value but a relative full path
// should be a utility function most prob
// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
Tabs.prototype.getHref = function ($tab) {
  var href = $tab.getAttribute('href')
  var hash = href.slice(href.indexOf('#'), href.length)
  return hash
}

export default Tabs
