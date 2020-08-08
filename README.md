# The Flatfile Component - @flatfile/react

We've made it really simple for your the get started with Flatfile with our new Flatfile Component. Here's what you'll need to know to get started.

First, install the dependency via npm:

`npm install @flatfile/react`

This will give you access to the `<FlatfileButton />` component as well as the same basic functionality as our Adapter.

## The FlatfileButton and FlatfileResults

`import { FlatfileButton, FlatfileResults } from '@flatfile/react'`

| **<u>FlatfileButton Props</u>**                                                                                         | **<u>Info</u>**               | <u>**Example**</u>                     |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------------------------------- |
| `settings` - This is where you will pass your [Flatfile settings/options](https://developers.flatfile.io/docs/options). | **Required. ** <br />_object_ | `settings={{ <br /> type: "Customers", |

    fields: [
      {key: "name", label: "Name"},
      {key: "email", label: "Email"}
    ]}}`

`customer`_ - \_Refers to the_ _[setCustomer function](https://developers.flatfile.io/docs/sdk/classes/flatfileimporter#setcustomer)_._|**Required**. <br />\_object - _[_CustomerObject_](https://developers.flatfile.io/docs/sdk/interfaces/customerobject)|_`customer={{`_ <br />`_ usedId: "1234",_`  
`_ companyId: "12",_`  
`_ companyName: "ABC",_`  
`_ email: "John@doe.com",_`  
`_ name: "John Doe"_`  
`_}}_`  
\_ _
`licenseKey`_ _ - Your Flatfile license key can be found in your dashboard when you [login here](https://app.flatfile.io/login).|**Required**. <br />\_string_|_`licenseKey={'ah12-alksjs2738-shdkaj123'}`\_\_ _
`onCancel`_ - \_An optional callback for handling a user cancelling.|Optional. <br />\_function - callback_|\_ _`\_onCancel={() => { // do something }}_`_ _`onData`- An optional way to use [FlatfileResults](https://developers.flatfile.io/docs/sdk/classes/flatfileresults) to return a new Promise.|Optional. <br />_function_|_`onData={async results => // do something}`__ _`onRecordChange`- An optional way to use [registerRecordHook](https://developers.flatfile.io/docs/datahooks#record-hooks-row-hooks) when a record changes.|Optional. <br />_function _|_`onRecordChange={(data, index) => `_[`_IDataHookResponse_`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse)`_ | Promise<_`[`_IDataHookResponse_`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse)`_>}_`_ _`onRecordInit`- An optional way to use [registerRecordHook](https://developers.flatfile.io/docs/datahooks#record-hooks-row-hooks) on initialization.|Optional. <br />_function_|_`onRecordInit={(data, index) => `_[`_IDataHookResponse_`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse)`_ | Promise<_`[`_IDataHookResponse_`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse)`_>}_`_ _`fieldHooks`- An optional way to pass in one or more callback functions to use with [registerFieldHook](https://developers.flatfile.io/docs/datahooks#field-hooks-column-hooks).|Optional. <br />object function(s) - callback(s)|`fieldHooks={`<br />`fieldName: (values) => { return // [`[`IDataHookRecord`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse/)`, index][]``}``render`- An optional way to pass in your own elements to render inside the FlatfileButton Component.|Optional. <br />function |`render={`<br />`(`[`FlatfileImporter`](https://developers.flatfile.io/docs/sdk/classes/flatfileimporter)`, `[`launch`](https://github.com/FlatFilers/react-adapter/blob/master/src/components/FlatFileButton.tsx#L83)`) => return ReactElement``}`

Try our example in [CodesandBox](https://codesandbox.io/s/react-flatfile-component-5l4le).
