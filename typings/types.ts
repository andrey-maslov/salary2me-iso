export interface IModalProps {
    isModalShown: boolean
    closeModal: () => void
}

export interface ILocation {
    countryISO: string
    city: string
    costLivingIndex: string
}