// Asset Configuration for Gitlantis 3D World
// Add your custom 3D models, textures, and assets here

export interface AssetConfig {
  name: string;
  path: string;
  type: 'model' | 'texture' | 'audio';
  description: string;
}

// Custom Boat Models
export const boatAssets: AssetConfig[] = [
  {
    name: 'default-boat',
    path: '', // Uses built-in geometry
    type: 'model',
    description: 'Default geometric boat made from Three.js primitives'
  },
  // Add your custom boat models here:
  // {
  //   name: 'pirate-ship',
  //   path: '/models/pirate-ship.glb',
  //   type: 'model',
  //   description: 'Custom pirate ship model'
  // }
];

// Ocean Textures
export const oceanAssets: AssetConfig[] = [
  {
    name: 'default-ocean',
    path: '',
    type: 'texture',
    description: 'Default blue ocean material'
  },
  // Add your custom ocean textures here:
  // {
  //   name: 'tropical-ocean',
  //   path: '/textures/tropical-water.jpg',
  //   type: 'texture',
  //   description: 'Tropical blue-green ocean texture'
  // }
];

// Lighthouse Models
export const lighthouseAssets: AssetConfig[] = [
  {
    name: 'default-lighthouse',
    path: '',
    type: 'model',
    description: 'Default geometric lighthouse'
  },
  // Add your custom lighthouse models here:
  // {
  //   name: 'vintage-lighthouse',
  //   path: '/models/vintage-lighthouse.glb',
  //   type: 'model',
  //   description: 'Vintage style lighthouse model'
  // }
];

// Buoy Models
export const buoyAssets: AssetConfig[] = [
  {
    name: 'default-buoy',
    path: '',
    type: 'model',
    description: 'Default spherical buoy'
  },
  // Add your custom buoy models here:
  // {
  //   name: 'life-ring-buoy',
  //   path: '/models/life-ring.glb',
  //   type: 'model',
  //   description: 'Life ring style buoy'
  // }
];

// Sky/Environment Assets
export const environmentAssets: AssetConfig[] = [
  {
    name: 'default-sky',
    path: '',
    type: 'texture',
    description: 'Default gradient sky background'
  },
  // Add your custom skyboxes here:
  // {
  //   name: 'sunset-sky',
  //   path: '/textures/sunset-skybox.hdr',
  //   type: 'texture',
  //   description: 'Sunset skybox with warm colors'
  // }
];

// Audio Assets
export const audioAssets: AssetConfig[] = [
  // Add your custom audio files here:
  // {
  //   name: 'ocean-waves',
  //   path: '/audio/ocean-waves.mp3',
  //   type: 'audio',
  //   description: 'Ocean wave sound effects'
  // },
  // {
  //   name: 'seagulls',
  //   path: '/audio/seagulls.mp3',
  //   type: 'audio',
  //   description: 'Seagull ambient sounds'
  // }
];

// Currently selected assets (change these to use your custom assets)
export const selectedAssets = {
  boat: 'default-boat',
  ocean: 'default-ocean',
  lighthouse: 'default-lighthouse',
  buoy: 'default-buoy',
  sky: 'default-sky'
};

// Asset loading helper
export const getAssetPath = (category: keyof typeof selectedAssets): string => {
  const assetName = selectedAssets[category];
  let assets: AssetConfig[] = [];
  
  switch (category) {
    case 'boat':
      assets = boatAssets;
      break;
    case 'ocean':
      assets = oceanAssets;
      break;
    case 'lighthouse':
      assets = lighthouseAssets;
      break;
    case 'buoy':
      assets = buoyAssets;
      break;
    case 'sky':
      assets = environmentAssets;
      break;
  }
  
  const asset = assets.find(a => a.name === assetName);
  return asset?.path || '';
};