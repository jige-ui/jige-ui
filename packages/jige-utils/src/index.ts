import type { Accessor, AccessorArray, OnEffectFunction } from 'solid-js'
import { createEffect, on } from 'solid-js'

export function createWatch<S, Next extends Prev, Prev = Next>(
  targets: AccessorArray<S> | Accessor<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  opt?: {
    defer?: boolean
  },
) {
  createEffect(on(targets, fn, { defer: opt?.defer }) as any)
}

export * from './css'
export * from './dom'
export * from './event'
export * from './is'
export * from './timer'
export * from './types'
export * from './array'
export * from './scheduled'
