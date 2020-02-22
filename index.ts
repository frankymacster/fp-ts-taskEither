import { left, right, TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { Task } from 'fp-ts/lib/Task'

const fetchTryCatch = (url: string): TaskEither<Error, string> =>
  tryCatch(
    () =>
      fetch(url)
        .then(res => res.json()),
    reason =>
      new Error(String(reason))
  )

const safeFetch = (url: string): Promise<object> =>
  fetchTryCatch(url)
    .fold((error: Error): object =>
      error
    , (value: string): object =>
      JSON.parse(value)
    )
    .run()

const asyncFn = async () => {
  const result = await safeFetch("https://jsonplaceholder.typicode.com/todos/1")
  console.log(result)
}

asyncFn()