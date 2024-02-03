interface NoDatMessageProps {
  message: string;
  addClass?: string;
}

export default function NoDataMessage({
  message,
  addClass,
}: NoDatMessageProps) {
  return (
    <p className={`text-center w-full text-gray-600 text-sm ${addClass}`}>
      {message}
    </p>
  );
}
