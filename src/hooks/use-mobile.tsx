
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | undefined

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = React.useState<DeviceType>(undefined)

  React.useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    // Set initial value
    checkDeviceType()

    // Add event listener for resize
    window.addEventListener('resize', checkDeviceType)

    // Clean up event listener
    return () => window.removeEventListener('resize', checkDeviceType)
  }, [])

  return deviceType
}

export function useOrientation() {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>()

  React.useEffect(() => {
    const updateOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation('portrait')
      } else {
        setOrientation('landscape')
      }
    }

    // Set initial value
    updateOrientation()

    // Add listeners for both window resize and orientation change
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)

    // Clean up
    return () => {
      window.removeEventListener('resize', updateOrientation)
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])

  return orientation
}

export function useTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check if the device supports touch
    const isTouchDevice = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0

    setIsTouch(isTouchDevice)
  }, [])

  return isTouch
}
