import { create } from 'zustand';

const useConsentStore = create((set) => ({
    consent: null,
    showConsentBanner: false,
    setConsent: (consent) => set({ consent }),
    setShowConsentBanner: (show) => set({ showConsentBanner: show }),
    resetConsent: () => {
        localStorage.removeItem('userConsent');
        localStorage.removeItem('userConsentDate');
        set({ consent: null, showConsentBanner: true });
    },
}));

export default useConsentStore;
