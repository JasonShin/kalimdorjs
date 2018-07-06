import * as _ from 'lodash';
import { KMeans } from '../../src/lib/cluster/k_means';

// TODO: Improve on kmeans cluster testing
describe('clusters:k_means', () => {
  const vector1 = [[1, 2], [1, 4], [1, 0], [4, 2], [4, 4], [4, 0]];

  it('should fit vector1 + k=2 should return centroids of size 2 and clusters of size 2', () => {
    const expecterdCluster = {
      centroids: [[2.5, 1], [2.5, 4]],
      clusters: [[[1, 2], [1, 0], [4, 2], [4, 0]], [[1, 4], [4, 4]]]
    };
    const kmean = new KMeans({ k: 2 });
    const result = kmean.fit({ X: vector1 });
    expect(_.isEqual(expecterdCluster, result)).toBe(true);
  });

  it('should fit vector1 + k=3 size 3 and clusters of size 2', () => {
    const expectedCluster = {
      centroids: [[2.5, 2], [2.5, 4], [2.5, 0]],
      clusters: [[[1, 2], [4, 2]], [[1, 4], [4, 4]], [[1, 0], [4, 0]]]
    };
    const kmean = new KMeans({ k: 3 });
    const result = kmean.fit({ X: vector1 });
    expect(_.isEqual(result, expectedCluster)).toBe(true);
  });
});
