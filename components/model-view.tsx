"use client";
import { View } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewProps {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.MutableRefObject<THREE.PerspectiveCamera>;
  setRotationSize: React.Dispatch<React.SetStateAction<number>>;
  item: {
    title: string;
    color: string[];
    image: string;
  };
  size: "small" | "big";
}

export const ModelView = ({
  controlRef,
  groupRef,
  gsapType,
  index,
  item,
  setRotationSize,
  size,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className="border-2 border-red-500"></View>
  );
};
