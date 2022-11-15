import React, {useCallback, useEffect, useRef} from 'react'
import style from './Range.module.css'

export type SuperRangePropsType = {
    value1: number
    value2?: number
    setValue1: (value: number) => void
    setValue2?: (value: number) => void
    id: string
}

const SuperRange: React.FC<SuperRangePropsType> = ({value1, setValue1, setValue2, ...props}) => {
    const range = useRef<HTMLInputElement | null>(null);
    let value2 = props.value2 ? props.value2 : 100;

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (range.current) {
            if (setValue2) {
                range.current.style.left = `${value1}%`
                range.current.style.width = `${value2 - value1}%`
            } else {
                range.current.style.left = `${0}%`
            }
        }


    }, [value2, value1]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (range.current) {
            if (setValue2) {
                range.current.style.width = `${value2 - value1}%`
            } else {
                range.current.style.width = `${value1}%`
            }
        }
    }, [value2, value1]);

    return (
        <div className={style.container}>
            <input
                type="range"
                min={'0'}
                max={'100'}
                value={value1}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), value2)
                    setValue1(value);
                }}
                className={`${style.thumb} ${style.thumb__left}`}
            />
            {setValue2 && <input
              type="range"
              min={'0'}
              max={'100'}
              value={value2}
              onChange={(event) => {
                  const value = Math.max(Number(event.target.value), value1)
                  setValue2(value);
              }}
              className={`${style.thumb} ${style.thumb__right}`}
            />}

            <div className={style.slider}>
                <div className={style.slider__track}/>
                <div ref={range} className={style.slider__range}/>
            </div>
        </div>
    );
};

export default SuperRange
