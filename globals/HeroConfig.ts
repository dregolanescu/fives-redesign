import type { GlobalConfig } from 'payload'
export const HeroConfig: GlobalConfig = {
  slug: 'hero-config',
  label: 'Configurare Hero',
  fields: [
    { name: 'displayMode', type: 'select', label: 'Mod afisare', required: true, defaultValue: 'single',
      options: [{ label: 'Un singur slide', value: 'single' },{ label: 'Slider', value: 'slider' }] },
    { name: 'transitionDuration', type: 'number', label: 'Durata slide (sec)', defaultValue: 8,
      min: 3, max: 30,
      admin: { condition: (d) => d?.displayMode === 'slider' } },
    { name: 'transitionType', type: 'select', label: 'Tip tranzitie', defaultValue: 'crossfade',
      options: [{ label: 'Crossfade', value: 'crossfade' }, { label: 'Fade through black', value: 'fade-through-black' }],
      admin: { condition: (d) => d?.displayMode === 'slider' } },
    { name: 'autoplay', type: 'checkbox', label: 'Autoplay', defaultValue: true,
      admin: { condition: (d) => d?.displayMode === 'slider' } },
    { name: 'showNavigation', type: 'checkbox', label: 'Arata puncte navigare', defaultValue: true,
      admin: { condition: (d) => d?.displayMode === 'slider' } },
  ],
}
