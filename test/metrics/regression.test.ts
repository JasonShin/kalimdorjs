import { mean_absolute_error, mean_squared_error } from '../../src/lib/metrics';
import { matchExceptionWithSnapshot } from '../util_testing';

describe('metrics:mean_absolute_error', () => {
  const yTrue1 = [3, -0.5, 2, 7];
  const yPred1 = [2.5, 0.0, 2, 8];
  const yTrue2 = [[0.5, 1], [-1, 1], [7, -6]];
  const yPred2 = [[0, 2], [-1, 2], [8, -5]];

  it('should calculate MAE of yTrue1 and yPred1 then return 0.5', () => {
    const error = mean_absolute_error(yTrue1, yPred1);
    expect(error).toBe(0.5);
  });

  it('should calculate MAE of yTrue2 and yPred2 then return 0.75', () => {
    const error = mean_absolute_error(yTrue2, yPred2);
    expect(error).toBe(0.75);
  });

  it('should calculate MAE of yTrue1 and yPred1 with weights [1, 2] then', () => {
    const error = mean_absolute_error(yTrue1, yPred1, {
      sample_weight: [1, 2, 3, 4]
    });
    expect(error).toBe(0.550000011920929);
  });
  it('should reject invalid inputs', () => {
    matchExceptionWithSnapshot(mean_absolute_error, [null, null]);
    matchExceptionWithSnapshot(mean_absolute_error, [1, 2]);
    matchExceptionWithSnapshot(mean_absolute_error, ['test', 'zz']);
    matchExceptionWithSnapshot(mean_absolute_error, [[1, 2, 3], [4, 5]]);
    matchExceptionWithSnapshot(mean_absolute_error, [
      [1, 2],
      [3, 4],
      { sample_weight: [1] }
    ]);
  });
});

describe('metrics:mean_squared_error', () => {
  const yTrue1 = [3, -0.5, 2, 7];
  const yPred1 = [2.5, 0.0, 2, 8];
  const yTrue2 = [[0.5, 1], [-1, 1], [7, -6]];
  const yPred2 = [[0, 2], [-1, 2], [8, -5]];
  it('should calculate MSE of yTrue1 and yPred1 then return 0.375', () => {
    const error = mean_squared_error(yTrue1, yPred1);
    expect(error).toBe(0.375);
  });

  it('should calculate MSE of yTure2 and yPred2 then return 0.7083333134651184', () => {
    const error = mean_squared_error(yTrue2, yPred2);
    expect(error).toBe(0.7083333134651184);
  });

  it("should throw an exception if inputs' shapes are different", () => {
    matchExceptionWithSnapshot(mean_squared_error, [yTrue2, [1, 2]]);
    matchExceptionWithSnapshot(mean_squared_error, [[1, 2], yTrue2]);
    matchExceptionWithSnapshot(mean_squared_error, [yTrue1, yTrue2]);
    matchExceptionWithSnapshot(mean_squared_error, [null, null]);
  });
});
