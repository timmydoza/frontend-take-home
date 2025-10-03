# Frontend Take-Home Assignment

Hi! Thanks for taking a look at my take home assignment.

## Installation

To install all dependencies, run this command in the project root:

```bash
npm install
```

This should install all dependencies for both the client/ and the server/ folders.

## Run

To start the application, run this command in the project root:

```bash
npm run dev
```

This should run two concurrent npm commands for both the client and the server. Then visit `http://localhost:5173` in your browser.

## Other thoughts

### Libraries

Whenever a new React application is built, consideration must be given to which libraries should be used in the application. One way to think about this is to ask yourself "what would it take to build everything from scratch?"

Thinking about the requirements of this project, I knew that we need certain features with respect to fetching data from the server:

- Fetch data, and store in cache
- Invalidate cache after posting data to server
- See loading states while data is fetching
- See error states in case of error

This all could be built from scratch, but we'd have to build a somewhat substantial state management system, in a React Provider, for the caching mechanism. We'd also have to build a number of custom 'fetch' hooks so that information about loading and errors could be used. This is not a small amount of work, so it seems best to get help from a library. The `react-query` library by Tanstack gives us many of these features right out of the box. The `queryClient` is essentially a state management system for server data and caching.

Another useful library that is it's own kind of 'state management system' is `react-hook-form`. This library manages the state for forms, including field values, field validity, and field errors. The functionality here would be cumbersome to build from scratch, so this is also a library worth using. The library features that we will be using include:

- Tracking form updates efficiently (without causing needless react updates)
- Specifying error messages for required fields
- Submitting form data only when whole form is valid
- Hiding all error information before submission attempts.

A deliberate pattern that I implemented with this library has to do with form submission and errors. I'm allowing users to always be able to click the Submit button, even when the form is incomplete or invalid. If the user attempts to submit a bad form, then actionable error messages will be shown next to the inputs with problems. This is in contrast to the pattern of disabling the Submit button when the form is invalid. This prevents bad form submissions, but it does not give the user any actionable information, and leaves them 'guessing' about how to fix the form.

One benefit of seeing `react-query` and `react-hook-form` as specialized state management libraries, is that they greatly help to reduce the amount of state management that we need to implement ourselves. With these libraries, the only state management that we needed to build for this application was nothing more than a handful of `useState()` hooks.

### UI

Lastly, `radix/themes` was used for UI components. This was the obvious choice for this project, but this library does appear to provide the right components to build the Figma mocks that were provided. I also wanted to use this library to gain some practice with it, because it's new to me.

`radix/themes` seems to have very good defaults right out of the box, and it takes special care to be a user-friendly and accessible component library. For instance, one thing I wanted to implement (which radix handles automatically), is that, when trying to delete a user or role in the `<AlertDialog />` component, the browsers focus should not automatically be on the Delete button. This helps to prevent the accidental deletion of these entities.

### Error Handling

In my mind there are two classes of network errors in this application:

1. Errors that are fatal. There's no recovery from these, the user must reload the page.
2. Errors that can be retried. These errors can still result in a usable app. Friendly UX is shown to guide the user through a retry.

The API calls for loading a page of users or roles are the requests that can result in 'fatal' errors. If the app cannot load users from the server, what else can be done? In these instances, we throw errors and catch them in an error boundary which instructs the user that a problem has occurred and that the app must be reloaded. One nice feature of `react-query` is that it has built in logic for retrying queries with exponential backoff. This retry logic does make the random server errors mostly invisible to the user when retrieving users or roles.

The API calls for mutating server resources are the requests that are not fatal, and can be retried. The app can still be used after one of these errors. These errors don't use the error boundary, instead they are shown inside a `<Callout />` component near the form. This callout displays the server's error message to the user (useful because sometimes the user must fix something, like a duplicate role name), and offers the user a chance to retry the operation.

### What could be done better?

I feel that the frontend code for this project is good. It's well-structured, avoids large file lengths, has clean readable code, and utilizes some reusable components and types. There is room for improvement though.

First, I'm seeing that there is some repetitive boilerplate code between all of the dialog components (e.g. `AddUserDialog.tsx`, `AddRoleDialog.tsx`, `UpdateUserDialog.tsx`, etc.). This suggests that a single reusable component could be useful for building these dialog forms. A nice API for a new `<FormDialog />` component could look like this:

```tsx
<FormDialog
  title="Update Role"
  description="Update an existing role."
  defaultValues={role}
  onSubmit={(data) => mutate({ roleId: role.id, role: data })}
>
  <TextInput name="name" label="Name" required />
  <TextInput name="description" label="Description" required />
  <SelectInput
    name="isDefault"
    label="Is Default?"
    options={[
      { label: "Yes", value: "true" },
      { label: "No", value: "false" },
    ]}
    required
  />
</FormDialog>
```

Another opportunity to refactor lies in the two tables. These tables both contain some duplicate code, and could also benefit from a common `<Table />` component. This component could accept a declarative table configuration array, similar to what is produced by the Tanstack Table library.

The error handling code in the `api.ts` is repetitive, and could be improved.

One downside of using `react-hook-form` is that it takes a little bit of work to make any reusable inputs type-save. This application does have some reusable inputs that consume a `react-hook-form` context, but there is currently no protection in place around using these inputs improperly:

Right now it is possible to supply a name prop that does not point to a value in a form:

```tsx
<TextInput name="thisPropertyMightNotExist" />
```

With some clever type-safety, we could pass in a type to these components to make sure that the name prop is correct:

```tsx
type FormData = {
  foo: string
}

<TextInput<FormData> name="foo" /> // Good!
<TextInput<FormData> name="doesNotExist" /> // results in typescript error
```

This would eliminate a whole class of bug where a mis-typed string can cause runtime problems not caught by TS (similar issues exist in the cache key strings for `useQuery`).

There is a small UI problem in the dropdown menu with the "Edit" and "Delete" options. Once an "edit" modal is opened and closed, the dropdown menu remains open. There appears to be a [workaround](https://github.com/radix-ui/primitives/issues/1836?utm_source=chatgpt.com) for this, but it isn't so simple. I decided to just leave this problem for now while also noting what this fix would be.

Another improvement would be to add a loading spinner somewhere in the table. Say, if you edit a role name, then switch over to the users tab and look at a user with the same role, it may take a second or two for this new role name to make it into the `react-query` cache. During this time, it would be nice to display something to the user to indicate that new data is being fetched. Alternatively, we could just show `<Skeleton />` components when the cache is being refreshed, but this feels like an approach that could be jarring for the user.
