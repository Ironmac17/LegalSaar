export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  // eslint-disable-next-line no-unused-vars
  as: Component = "button",
  ...props
}) {
  const baseClasses =
    "font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    accent:
      "bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500",
    success:
      "bg-success-600 text-white hover:bg-success-700 focus:ring-success-500",
    danger:
      "bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const className = `${baseClasses} ${variants[variant]} ${sizes[size]}`;

  return (
    <Component className={className} disabled={disabled || loading} {...props}>
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin"></span>
          {children}
        </span>
      ) : (
        children
      )}
    </Component>
  );
}
