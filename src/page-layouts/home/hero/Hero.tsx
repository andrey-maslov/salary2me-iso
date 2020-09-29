import RobotWide from "../../../components/common/media/robots/robot-wide/RobotWide"
import RobotTall from "../../../components/common/media/robots/robot-tall/RobotTall"
import Version from "./version/Version"
import Dropzone from "../../../components/common/dropzone/Dropzone"

import style from './hero.module.scss'

type HeroType = {
    content: string
}

const Hero: React.FC<HeroType> = ({content}) => {

    return (
        <div className={style.hero}>
            <div className="container">
                <div className="row between-xs bottom-xs">
                    <div className="col-lg-6">
                        <h1
                            className={style.title}
                            dangerouslySetInnerHTML={{__html: content}}
                        />
                        <Version/>
                        <div className={style.dropzone}>
                            <Dropzone
                            />
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className={style.robots}>
                            <RobotWide/>
                            <RobotTall/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero