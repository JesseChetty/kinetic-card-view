// Asset Configuration for Gitlantis 3D World
// Add your custom 3D models, textures, and assets here

export interface AssetConfig {
  name: string;
  path: string;
  type: 'model' | 'texture' | 'audio';
  description: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  position?: [number, number, number];
}

// Custom Boat Models
export const boatAssets: AssetConfig[] = [
  {
    name: 'default-boat',
    path: '', // Uses built-in geometry
    type: 'model',
    description: 'Default geometric boat made from Three.js primitives'
  },
  {
    name: 'cartoon-boat',
    path: '/models/boat_cartoon_3d.glb',
    type: 'model',
    description: 'Custom cartoon boat model',
    scale: [1.5, 1.5, 1.5],
    rotation: [0, -Math.PI / 2, 0],
    position: [0, 0.2, 0]
  }
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
  {
    name: 'custom-lighthouse',
    path: '/models/lighthouse.glb',
    type: 'model',
    description: 'User-provided GLB lighthouse model',
    scale: [2, 2, 2],
    rotation: [0, 0, 0],
    position: [0, 0, 0]
  },
  // Add your custom lighthouse models here:
  // {
  //   name: 'vintage-lighthouse',
  //   path: '/models/vintage-lighthouse.glb',
  //   type: 'model',
  //   description: 'Vintage style lighthouse model',
  //   scale: [1, 1, 1],
  //   rotation: [0, 0, 0],
  //   position: [0, 0, 0]
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
  {
    name: 'custom-buoy',
    path: '/models/buoy.glb',
    type: 'model',
    description: 'Custom buoy model',
    scale: [0.67, 0.67, 0.67],
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0]
  }
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
  boat: 'cartoon-boat',
  ocean: 'default-ocean',
  lighthouse: 'custom-lighthouse',
  buoy: 'custom-buoy',
  sky: 'default-sky'
};

// Asset loading helpers
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

export const getAssetConfig = (category: keyof typeof selectedAssets): AssetConfig | null => {
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
  
  return assets.find(a => a.name === assetName) || null;
};