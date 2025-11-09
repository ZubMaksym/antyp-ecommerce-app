import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Range from 'rc-slider';

const RangeSlider = () => {
    return (
        <div>
            <Slider
                range
                allowCross={false}
                // value={range}
                min={0}
                max={100}
                defaultValue={[0, 100]}
                // onChange={(value: any) => setRange(value)}
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
            {/* <Range min={0} max={20} defaultValue={[3, 10]}/> */}
        </div>
    );
};

export default RangeSlider;
