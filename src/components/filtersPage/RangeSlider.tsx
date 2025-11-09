import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { RangeSliderProps } from '@/types/componentTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { setAlcoholStrengthRange } from '@/state/filterSlice/filterSlice';

const RangeSlider = ({ min, max }: RangeSliderProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const {selectedAlcoholStrength} = useSelector((state: RootState) => state.filter);

    return (
        <div className='flex flex-col'>
            <Slider
                range
                allowCross={false}
                value={[selectedAlcoholStrength.min, selectedAlcoholStrength.max]}
                min={min}
                max={max}
                step={0.1}
                defaultValue={[min, max]}
                onChange={(value: number | number[]) => dispatch(setAlcoholStrengthRange(value))}
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
                    {selectedAlcoholStrength.min}%
                </div>
                <div className=''>
                    {selectedAlcoholStrength.max}%
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
