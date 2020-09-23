import style from './bar.module.scss';

const Bar = ({value, limits}) => {

    const width = Math.round(((value - limits[0]) * 100) / (limits[1] - limits[0]));

    let fullWidth = width / 1.4 + 30;

    if (fullWidth > 100) {
        fullWidth = 100;
    }

    const barStyles = {
        width: `${fullWidth}%`
    };

    return (
        <div className={style.barWrap}>
            <div style={barStyles} className={style.bar}>
                <div
                    className={`${style.inner} bg-accent-gradient`}
                />
            </div>
        </div>

    )

};

export default Bar;