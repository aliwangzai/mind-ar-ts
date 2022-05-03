import { FREAKPOINTS } from './freak';

const PYRAMID_MIN_SIZE = 8;
const PYRAMID_MAX_OCTAVE = 5;

const LAPLACIAN_THRESHOLD = 3.0;
const LAPLACIAN_SQR_THRESHOLD = LAPLACIAN_THRESHOLD * LAPLACIAN_THRESHOLD;
const EDGE_THRESHOLD = 4.0;
const EDGE_HESSIAN_THRESHOLD = ((EDGE_THRESHOLD + 1) * (EDGE_THRESHOLD + 1)) / EDGE_THRESHOLD;

const NUM_BUCKETS_PER_DIMENSION = 10;
const MAX_FEATURES_PER_BUCKET = 5;
const NUM_BUCKETS = NUM_BUCKETS_PER_DIMENSION * NUM_BUCKETS_PER_DIMENSION;
// total max feature points = NUM_BUCKETS * MAX_FEATURES_PER_BUCKET

const ORIENTATION_NUM_BINS = 36;
const ORIENTATION_SMOOTHING_ITERATIONS = 5;

const ORIENTATION_GAUSSIAN_EXPANSION_FACTOR = 3.0;
const ORIENTATION_REGION_EXPANSION_FACTOR = 1.5;
const FREAK_EXPANSION_FACTOR = 7.0;

const FREAK_CONPARISON_COUNT = ((FREAKPOINTS.length - 1) * FREAKPOINTS.length) / 2; // 666

export {
  PYRAMID_MIN_SIZE,
  PYRAMID_MAX_OCTAVE,
  LAPLACIAN_THRESHOLD,
  LAPLACIAN_SQR_THRESHOLD,
  EDGE_THRESHOLD,
  EDGE_HESSIAN_THRESHOLD,
  NUM_BUCKETS_PER_DIMENSION,
  MAX_FEATURES_PER_BUCKET,
  NUM_BUCKETS,
  ORIENTATION_NUM_BINS,
  ORIENTATION_SMOOTHING_ITERATIONS,
  ORIENTATION_GAUSSIAN_EXPANSION_FACTOR,
  ORIENTATION_REGION_EXPANSION_FACTOR,
  FREAK_EXPANSION_FACTOR,
  FREAK_CONPARISON_COUNT,
};