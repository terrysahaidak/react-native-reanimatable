declare module 'react-native-reanimatable' {
    import React, { RefForwardingComponent, PureComponent } from 'react'
    import Animated from 'react-native-reanimated'

    export type AnimationState = { [index: string]: number }

    export type AnimationType = { [index: string]: string }

    // TODO: Find proper typing for `generate`
    interface IAnimationConfigResult {
        type?: string,
        generate?: Object,
    }

    // TODO: Add delegate typing
    export interface IAnimationConfig {
        animation: { delegate, duration: number, interpolation },
        keyframes?: Object,
        values?: Object,
    }

    interface AnimationDelegate {
        event: (argMapping: readonly any[], config?: {}) => (...args: any[]) => void,
        value: Animated.Value<number>,
        reset: () => void,
    }

    export function createAnimationConfig(animationConfig: IAnimationConfig): IAnimationConfigResult

    // TODO: what is `eventType`, is `path` correct?
    export function createDelegate(eventType: any, path: string[]): AnimationDelegate

    interface Animation {
        runTiming: (
            clock: Animated.Clock,
            duration: number,
            oppositeClock: Animated.Clock,
            value: Animated.Adaptable<number>,
            dest: Animated.Adaptable<number>,
            easing: Animated.EasingFunction,
            // TODO: This might be wrong
            onFinish: (clock: Animated.Clock) => Animated.Node<number>
        ) => Animated.Node<number>,
        getProperAnimation: (
            // TODO: Can be wrong
            reanimatableConfig: any,
            animationConfig: IAnimationConfig
        ) => Animated.Node<number> | Error,
    }

    // animations
    export const animations: Animation

    // ScrollView
    export class ScrollView extends PureComponent {
        constructor();

        delegate: {
            event: Object,
            reset: () => void,
        }

        onScroll: () => void

        onScrollEndDrag: () => void

        vertical: boolean

        initialScrollPosition: {
            x: number,
            y: number,
        }

        snapPoints: {
            from: number,
            to: number,
            snap: number,
        }[]
    }

    // LoopAnimation
    export class LoopAnimation extends PureComponent {
        constructor();

        iterationCount: number

        // config: animationConfigPropTypes.isRequired,

        autoplay: boolean
    }
}