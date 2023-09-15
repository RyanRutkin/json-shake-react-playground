import { useState } from 'react';
import { ShakeClosure } from '../../classes/ShakeClosure.class';
import { AppPage } from '../../components/Page/Page.component';
import { ShakeClosureDefinition } from '../../types/ShakeClosureDefinition.type';
import './Dashboard.page.css';

export const AppDashboard = () => {
    const [ code, setCode ] = useState<string>("");

    const processCode = () => {
        let codeJson: Record<string, any> | null = null;
        try {
            codeJson = JSON.parse(code);
        } catch(e) {
            throw new Error(`Failed to parse code as JSON: ${ String(e) }`);
        }
        debugger;
        const codeInstance = ShakeClosure.deserializeFromJson(codeJson as unknown as ShakeClosureDefinition);
        const watch = 'watch';
    }

    return (
        <AppPage className='app-dashboard' >
            <div className='app-dashboard-row' >
                <textarea id="app-code-input" value={ code } onChange={ e => {
                    if (!e?.target) {
                        return;
                    }
                    setCode(e.target.value);
                }} />
            </div>
            <div className='app-dashboard-row' >
                <button onClick={ processCode } >Run</button>
            </div>
        </AppPage>
    )
}