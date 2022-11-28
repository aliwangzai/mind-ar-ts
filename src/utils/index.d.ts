type MediaGetFunction = (
  constraints?: MediaStreamConstraints,
  success,
  error
) => Promise<MediaStream>;
interface Navigator {
  webkitGetUserMedia: MediaGetFunction;
  mozGetUserMedia: MediaGetFunction;
  getUserMedia: MediaGetFunction;
}
