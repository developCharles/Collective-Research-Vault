export const PAPER_TYPES = [
  'Research Article',
  'Case Study',
  'Meta-Analysis',
  'Review Article',
  'Methodology',
  'Theoretical',
]

const titles = [
  'Sustainable Architecture: Passive Cooling in Tropics',
  'Urban Climatology: Mitigating the Urban Heat Island Effect in High-Density Cities',
  'Geotechnical Engineering: Seismic Resilience of Earth-Sheltered Residential Structures',
  'Acoustic Architecture: Sound Attenuation in Open-Plan Educational Facilities Using Bio-Based Materials',
  'Renewable Energy Engineering: Efficiency Optimization of Bifacial Solar Panels in Temperate Zones',
  'Biophilic Design: Integrating Vertical Forests in Modern High-Rise Commercial Buildings',
  'Vernacular Architecture: Adapting Ancient Adobe Thermal Mass Techniques for Contemporary Housing',
  'Hydrological Engineering: Optimizing Urban Drainage Networks for Extreme Precipitation Events',
  'Circular Construction: The Reusability of Cross-Laminated Timber in Modular Housing',
  'Smart Building Technology: AI-Driven HVAC Control Systems for Energy-Efficient Workplaces',
  'Resilient Infrastructure: Designing Coastal Flood Barriers with Nature-Based Materials',
  'Structural Sustainability: Evaluating Carbon-Negative Concrete Formulations in Infrastructure Development',
]

export const galleryPapers = titles.map((title, i) => ({
  id: i + 1,
  title,
  authors: 'Dela Cruz et al.',
  publishedAt: '2024-06-15T00:00:00Z',
  rating: 4.8,
  type: PAPER_TYPES[i % PAPER_TYPES.length],
}))