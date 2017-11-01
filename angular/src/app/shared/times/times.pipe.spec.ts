import {TimesPipe} from "./times.pipe";

describe('TimesPipe', () => {
    let pipe: TimesPipe;

    beforeEach(() => {
        pipe = new TimesPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('returns an array with length of the input value', () => {
        // given
        const value = 6;

        // when
        const result = pipe.transform(value);

        // then
        expect(result.length).toBe(value);
    });

    it('returns an empty array if input is invalid', () => {
        // when
        const result = pipe.transform(-10);

        // then
        expect(result).toEqual([]);
    })
});
