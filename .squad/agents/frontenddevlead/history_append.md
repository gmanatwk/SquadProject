
## Learnings (appended)

- API client design: centralized axios client with interceptors, type-safe request wrapper, and abort-signal support for cancellable requests.
- Redux: use createAsyncThunk with thunkAPI.signal to cancel inflight requests; keep slices focused (converter/generator) with selectors and small reducers.
- Forms: React Hook Form for validation, minimal presentational components, validate before dispatching thunks.
- Error strategy: global interceptor for logging, local error state in slices, UI-level toasts for user-facing errors.
