# Tabs

## Introduction

Component for conditionally revealing content, using the details HTML element.

## Guidance

Find out when to use the Tabs component in your service in the [GOV.UK Design System](https://govuk-design-system-production.cloudapps.digital/components/tabs).

## Quick start examples

### Component default

[Preview the tabs component](http://govuk-frontend-review.herokuapp.com/components/tabs/preview)

#### Markup

    <div class="govuk-tabs" data-module="tabs">
      <h2 class="govuk-tabs__title">
        Contents
      </h2>

      <ul class="govuk-tabs__list">

          <li class="govuk-tabs__list-item">
            <a class="govuk-tabs__tab" href="#before-you-start">
              Before you start
            </a>
          </li>

          <li class="govuk-tabs__list-item">
            <a class="govuk-tabs__tab" href="#need-to-know">
              Need to know
            </a>
          </li>

          <li class="govuk-tabs__list-item">
            <a class="govuk-tabs__tab" href="#ways-to-apply">
              Ways to apply
            </a>
          </li>

      </ul>

      <section class="govuk-tabs__panel js-hidden" id="before-you-start">
        <h2 class="govuk-heading-l">Before you start</h2>
    <p class="govuk-body">To get your first provisional driving licence online for a car, motorcycle or moped you must:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>be a resident of Great Britain – there’s a different service in <a href="#">Northern Ireland</a></li>
      <li>meet the minimum age requirement</li>
      <li>meet the <a href="#">minimum eyesight requirement</a></li>
      <li>not be prevented from driving for any reason</li>
      <li>pay £50 by MasterCard, Visa, Electron, Maestro or Delta debit or credit card</li>
      <li>have a valid UK passport or <a href="#">other form of identity</a></li>
      <li>have your National Insurance number if known</li>
      <li>provide addresses where you’ve lived for the last 3 years</li>
    </ul>

      </section>

      <section class="govuk-tabs__panel js-hidden" id="need-to-know">
        <h2 class="govuk-heading-l">Need to know</h2>
    <ul class="govuk-list govuk-list--bullet">
      <li>proof of identification required</li>
      <li>3 years of address details required</li>
      <li>debit or credit card required</li>
    </ul>

      </section>

      <section class="govuk-tabs__panel js-hidden" id="ways-to-apply">
        <h2 class="govuk-heading-l">Ways to apply</h2>
    <p class="govuk-body">You can apply by post by completing a D1 application form, which you can get from the <a href="">DVLA form ordering service</a> or from a Post Office.</p>
    <p class="govuk-body">You’ll also need to include:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>original documentation confirming your identity</li>
      <li>a colour <a href="">passport–style photograph</a></li>
      <li>the fee of £50 by cheque or postal order payable to DVLA (do not send cash)</li>
    </ul>
    <p class="govuk-body">Send your completed application and payment to DVLA, Swansea, SA99 1AD.</p>
    <p class="govuk-body">If you’re including non–UK identity documents send your application and payment to DVLA, Swansea, SA99 1AF.</p>

      </section>

    </div>

#### Macro

    {% from 'tabs/macro.njk' import govukTabs %}

    {{ govukTabs({
      "items": [
        {
          "label": "Before you start",
          "id": "before-you-start",
          "panel": {
            "html": "<h2 class=\"govuk-heading-l\">Before you start</h2>\n<p class=\"govuk-body\">To get your first provisional driving licence online for a car, motorcycle or moped you must:</p>\n<ul class=\"govuk-list govuk-list--bullet\">\n  <li>be a resident of Great Britain – there’s a different service in <a href=\"#\">Northern Ireland</a></li>\n  <li>meet the minimum age requirement</li>\n  <li>meet the <a href=\"#\">minimum eyesight requirement</a></li>\n  <li>not be prevented from driving for any reason</li>\n  <li>pay £50 by MasterCard, Visa, Electron, Maestro or Delta debit or credit card</li>\n  <li>have a valid UK passport or <a href=\"#\">other form of identity</a></li>\n  <li>have your National Insurance number if known</li>\n  <li>provide addresses where you’ve lived for the last 3 years</li>\n</ul>\n"
          }
        },
        {
          "label": "Need to know",
          "id": "need-to-know",
          "panel": {
            "html": "<h2 class=\"govuk-heading-l\">Need to know</h2>\n<ul class=\"govuk-list govuk-list--bullet\">\n  <li>proof of identification required</li>\n  <li>3 years of address details required</li>\n  <li>debit or credit card required</li>\n</ul>\n"
          }
        },
        {
          "label": "Ways to apply",
          "id": "ways-to-apply",
          "panel": {
            "html": "<h2 class=\"govuk-heading-l\">Ways to apply</h2>\n<p class=\"govuk-body\">You can apply by post by completing a D1 application form, which you can get from the <a href=\"\">DVLA form ordering service</a> or from a Post Office.</p>\n<p class=\"govuk-body\">You’ll also need to include:</p>\n<ul class=\"govuk-list govuk-list--bullet\">\n  <li>original documentation confirming your identity</li>\n  <li>a colour <a href=\"\">passport–style photograph</a></li>\n  <li>the fee of £50 by cheque or postal order payable to DVLA (do not send cash)</li>\n</ul>\n<p class=\"govuk-body\">Send your completed application and payment to DVLA, Swansea, SA99 1AD.</p>\n<p class=\"govuk-body\">If you’re including non–UK identity documents send your application and payment to DVLA, Swansea, SA99 1AF.</p>\n"
          }
        }
      ]
    }) }}

## Requirements

### Build tool configuration

When compiling the Sass files you'll need to define includePaths to reference the node_modules directory. Below is a sample configuration using gulp

    .pipe(sass({
      includePaths: 'node_modules/'
    }))

### Static asset path configuration

In order to include the images used in the components, you need to configure your app to show these assets. Below is a sample configuration using Express js:

    app.use('/assets', express.static(path.join(__dirname, '/node_modules/@govuk-frontend/frontend/assets')))

## Component arguments

If you are using Nunjucks,then macros take the following arguments

<table class="govuk-table">

<thead class="govuk-table__head">

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="col">Name</th>

<th class="govuk-table__header" scope="col">Type</th>

<th class="govuk-table__header" scope="col">Required</th>

<th class="govuk-table__header" scope="col">Description</th>

</tr>

</thead>

<tbody class="govuk-table__body">

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">id</th>

<td class="govuk-table__cell ">string</td>

<td class="govuk-table__cell ">No</td>

<td class="govuk-table__cell ">Optional id</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">classes</th>

<td class="govuk-table__cell ">string</td>

<td class="govuk-table__cell ">No</td>

<td class="govuk-table__cell ">Optional additional classes</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">attributes</th>

<td class="govuk-table__cell ">object</td>

<td class="govuk-table__cell ">No</td>

<td class="govuk-table__cell ">Any extra HTML attributes (for example data attributes) to add to the details element</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">idPrefix</th>

<td class="govuk-table__cell ">string</td>

<td class="govuk-table__cell ">No</td>

<td class="govuk-table__cell ">String to prefix id for each tab item if no id is specified on each item</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">items</th>

<td class="govuk-table__cell ">array</td>

<td class="govuk-table__cell ">Yes</td>

<td class="govuk-table__cell ">Array of tab items</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">item.id</th>

<td class="govuk-table__cell ">string</td>

<td class="govuk-table__cell ">Yes</td>

<td class="govuk-table__cell ">Id of a tab item. If not provided an idPrefix should be specified</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">item.label</th>

<td class="govuk-table__cell ">string</td>

<td class="govuk-table__cell ">Yes</td>

<td class="govuk-table__cell ">The text label of a tab item</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">item.panel.text</th>

<td class="govuk-table__cell ">string</td>

<td class="govuk-table__cell ">No</td>

<td class="govuk-table__cell ">Text to use within a panel item.</td>

</tr>

<tr class="govuk-table__row">

<th class="govuk-table__header" scope="row">item.panel.html</th>

<td class="govuk-table__cell ">string</td>

<td class="govuk-table__cell ">No</td>

<td class="govuk-table__cell ">HTML to use within a panel item. If this is provided, the text argument will be ignored.</td>

</tr>

</tbody>

</table>

### Setting up Nunjucks views and paths

Below is an example setup using express configure views:

    nunjucks.configure('node_modules/@govuk-frontend/frontend/components', {
      autoescape: true,
      cache: false,
      express: app
    })

## Contribution

Guidelines can be found at [on our Github repository.](https://github.com/alphagov/govuk-frontend/blob/master/CONTRIBUTING.md "link to contributing guidelines on our github repository")

## License

MIT