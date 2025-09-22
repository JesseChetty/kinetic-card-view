import { useGLTF } from '@react-three/drei';
import { AssetConfig } from '../../data/assets';

interface GLTFAssetProps {
  config: AssetConfig;
  children?: React.ReactNode;
}

export const GLTFAsset = ({ config, children }: GLTFAssetProps) => {
  if (!config.path) {
    return <>{children}</>;
  }

  const { scene } = useGLTF(config.path);
  
  // Clone the scene to avoid sharing between multiple instances
  const clonedScene = scene.clone();
  
  return (
    <group
      scale={config.scale || [1, 1, 1]}
      rotation={config.rotation || [0, 0, 0]}
      position={config.position || [0, 0, 0]}
    >
      <primitive object={clonedScene} castShadow receiveShadow />
      {children}
    </group>
  );
};