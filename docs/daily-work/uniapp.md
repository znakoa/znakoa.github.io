# uniapp 安卓语音播报

- 使用原生方法 不使用插件
- 原理 调用手机自带的**TTS引擎** 默认手机都会自带  特殊手机可以自己安装

```js showLineNumbers
export default class TTS {
    constructor() {
        // 初始化
        this.tts = null
        this.listener = null
        this.isInitialized = false
    }

    // 初始化 TTS 引擎
    init() {
        const TextToSpeech = plus.android.importClass('android.speech.tts.TextToSpeech')
        const Locale = plus.android.importClass('java.util.Locale')
        const main = plus.android.runtimeMainActivity()

        this.tts = new TextToSpeech(main, new plus.android.implements(
            'android.speech.tts.TextToSpeech$OnInitListener', {
                onInit: (status) => {
                    if (status === TextToSpeech.SUCCESS) {
                        this.isInitialized = true
                        // 默认语言设置为中文
                        this.tts.setLanguage(Locale.CHINESE)
                        this.setSpeechRate(1.0) // 默认语速
                        this.setPitch(1.0) // 默认音调
                        console.log('TTS 引擎初始化成功')
                    } else {
                        console.error('TTS 引擎初始化失败')
                    }
                }
            }
        ))


    }

    // 播放文本
    speak(text) {
        if (!this.isInitialized) {
            console.error('TTS 引擎未初始化')
            return
        }
        const TextToSpeech = plus.android.importClass('android.speech.tts.TextToSpeech')

        // 播放文字内容
        this.tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "utterance-id-001")
    }

    // 停止当前语音播放
    stop() {
        if (this.isInitialized) {
            this.tts.stop()
        }
    }

    // 设置语速
    setSpeechRate(rate) {
        if (this.isInitialized) {
            this.tts.setSpeechRate(rate)
        }
    }

    // 设置音调
    setPitch(pitch) {
        if (this.isInitialized) {
            this.tts.setPitch(pitch)
        }
    }
    // 释放 TTS 引擎
    shutdown() {
        if (this.isInitialized) {
            this.tts.stop()
            this.tts.shutdown()
            this.isInitialized = false
        }
    }
    // 获取系统默认的 TTS 引擎名称
    getDefaultEngine() {
        if (!this.tts) {
            console.error('TTS 引擎未初始化')
            return null
        }
        const engine = this.tts.getDefaultEngine()
        return engine
    }
    // 获取系统所有已安装的 TTS 引擎列表
    getAllEngines() {
        if (!this.tts) {
            console.error('TTS 引擎未初始化')
            return []
        }
        const engines = this.tts.getEngines() // Java ArrayList
        const list = []
        const size = plus.android.invoke(engines, 'size')
        for (let i = 0; i < size; i++) {
            const engineInfo = plus.android.invoke(engines, 'get', i)
            const name = plus.android.getAttribute(engineInfo, 'name') + ''
            const label = plus.android.getAttribute(engineInfo, 'label') + ''
            list.push({ name, label })
        }
        return list
    }
}

```

