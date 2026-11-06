
import {
  Eye,
  EyeOff,
  CircleAlert,
  LockKeyhole,
  ChevronDown,
  UserRound,
  Scale,
  Folder,
  CloudUpload,
  Trash2,
  RefreshCw,
} from "lucide-react";

import type { LucideProps } from "lucide-react";

type IconProps = LucideProps;

export function EyeIcon(props: IconProps) {
  return <Eye {...props} />;
}

export function EyeOffIcon(props: IconProps) {
  return <EyeOff {...props} />;
}

export function AlertCircleIcon(props: IconProps) {
  return <CircleAlert {...props} />;
}

export function LockIcon(props: IconProps) {
  return <LockKeyhole {...props} />;
}

export function ChevronDownIcon(props: IconProps) {
  return <ChevronDown {...props} />;
}

export function UserIcon(props: IconProps) {
  return <UserRound {...props} />;
}

export function ScaleIcon(props: IconProps) {
  return <Scale {...props} />;
}

export function FolderIcon(props: IconProps) {
  return <Folder {...props} />;
}

export function UploadCloudIcon(props: IconProps) {
  return <CloudUpload {...props} />;
}

export function TrashIcon(props: IconProps) {
  return <Trash2 {...props} />;
}

export function RefreshIcon(props: IconProps) {
  return <RefreshCw {...props} />;
}
