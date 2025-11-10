import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { RangeSliderProps } from '@/types/componentTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { setAlcoholStrengthRange } from '@/state/filterSlice/filterSlice';
import { useState, useEffect, ChangeEvent, SetStateAction } from 'react';

const RangeSlider = ({ min, max }: RangeSliderProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedAlcoholStrength } = useSelector(
        (state: RootState) => state.filter
    );
    const [minInput, setMinInput] = useState<string>('');
    const [maxInput, setMaxInput] = useState<string>('');

    const handleMinInput = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setMinInput(val);
        if (val === '') return;
        const num = Number(val);
        if (!isNaN(num) && num <= localValue[1]) {
            setLocalValue([num, localValue[1]]);
        }
    };

    const handleMinBlure = () => {
        if (minInput === '') {
            setMinInput(String(min));
            setLocalValue([min, localValue[1]]);
            return;
        }
        const num = Number(minInput);
        if (num < min || num > max) {
            setMinInput(String(min));
            setLocalValue([min, localValue[1]]);
        }
    };

    const handleMaxInput = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setMaxInput(val);
        if (val === '') return;
        const num = Number(val);
        if (!isNaN(num) && num >= localValue[0]) {
            setLocalValue([localValue[0], num]);
        }
    };

    const handleMaxBlure = () => {
        if (maxInput === '') {
            setMaxInput(String(max));
            setLocalValue([localValue[0], max]);
            return;
        }
        const num = Number(maxInput);
        if (num > max || num < min) {
            setMaxInput(String(max));
            setLocalValue([localValue[0], max]);
        }
    };

    const [localValue, setLocalValue] = useState<[number, number]>([
        selectedAlcoholStrength.min,
        selectedAlcoholStrength.max
    ]);

    useEffect(() => {
        setLocalValue([
            selectedAlcoholStrength.min,
            selectedAlcoholStrength.max
        ]);
    }, [selectedAlcoholStrength]);

    useEffect(() => {
        setMinInput(String(localValue[0]));
        setMaxInput(String(localValue[1]));
        const timer = setTimeout(() => {
            dispatch(setAlcoholStrengthRange(localValue));
        }, 500);

        return () => clearTimeout(timer);
    }, [localValue, dispatch]);

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center mb-3'>
                <div className='flex flex-col'>
                    <label htmlFor='min' className='text-[#4d6d7e]'>From</label>
                    <input
                        id='min'
                        type='number'
                        step={0.1}
                        value={minInput}
                        onChange={handleMinInput}
                        onBlur={handleMinBlure}
                        placeholder='From'
                        className='mt-1 focus:outline-offset-2 focus:outline-2 focus:outline-[#4d6d7e80] focus:ring-2 ring-[#4d6d7e] lg:border-0 border border-[#4d6d7e]
                                   rounded-lg bg-white text-[#4d6d7e] px-3 h-[40px] w-[100px] placeholder:text-[16px] placeholder:text-[#6E8792]'
                    />
                </div>
                <span className='w-[30px] mt-5 h-[1.5px] bg-[#4d6d7e]'></span>
                <div className='flex flex-col'>
                    <label htmlFor='max' className='text-[#4d6d7e]'>To</label>
                    <input
                        id='max'
                        type='number'
                        step={0.1}
                        value={maxInput}
                        onChange={handleMaxInput}
                        onBlur={handleMaxBlure}
                        placeholder='To'
                        className='mt-1 focus:outline-offset-2 focus:outline-2 focus:outline-[#4d6d7e80] focus:ring-2 ring-[#4d6d7e] lg:border-0 border border-[#4d6d7e]
                                   rounded-lg bg-white text-[#4d6d7e] px-3 w-[100px] h-[40px] placeholder:text-[16px] placeholder:text-[#6E8792]'
                    />
                </div>
            </div>
            <Slider
                range
                allowCross={false}
                value={localValue}
                min={min}
                max={max}
                step={0.1}
                defaultValue={[min, max]}
                onChange={(value: any) => setLocalValue(value)}
                trackStyle={{ backgroundColor: '#4d6d7e', height: '3px', margin: '0px auto' }}
                railStyle={{ height: '2px' }}
                handleStyle={{
                    backgroundColor: '#4d6d7e',
                    opacity: '1',
                    border: '#4d6d7e',
                    width: '12px',
                    height: '12px'
                }}
            />
            <div className='flex justify-between *:text-[#4d6d7e] font-medium'>
                <div className=''>
                    {localValue[0]}%
                </div>
                <div className=''>
                    {localValue[1]}%
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
