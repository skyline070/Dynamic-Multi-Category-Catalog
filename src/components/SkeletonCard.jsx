const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white p-3 rounded-lg shadow">

      {/* 🖼 Image Skeleton */}
      <div className="bg-gray-300 h-40 w-full rounded-md" />

      {/* 🏷 Title Skeleton */}
      <div className="h-4 bg-gray-300 mt-3 rounded w-3/4"></div>

      {/* 📂 Subtitle Skeleton */}
      <div className="h-3 bg-gray-200 mt-2 rounded w-1/2"></div>

      {/* ➕ Extra line (makes it more realistic) */}
      <div className="h-3 bg-gray-200 mt-2 rounded w-2/3"></div>

    </div>
  );
};

export default SkeletonCard;