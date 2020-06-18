import { createMedia } from "@artsy/fresnel"

const ExampleAppMedia = createMedia({
    breakpoints: {
        xs: 0,
        md: 992,
    },
})

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle()

export const { Media, MediaContextProvider } = ExampleAppMedia