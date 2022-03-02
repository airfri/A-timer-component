export default class Timer {
    constructor(root){
        root.innerHTML=Timer.getHTML();
        
        // 属性是可以通过this在原型的方法上拿到的，this.el=el; 表示定义一个属性el，并把参数el赋值给它，这样其他方法中就可以间接的使用参数el了。
        this.el = {
            minutes: root.querySelector(".timer_min"),
            seconds: root.querySelector(".timer_sec"),
            control: root.querySelector(".timer_btn-control"),
            reset: root.querySelector(".timer_btn-reset")
        };
        console.log(this.el)
        
        this.interval = null; // 布尔 倒计时有没有结束 
        this.remainingSeconds = 0; //剩余多少秒 用该参数去更新显示的 分：秒
        
        this.el.control.addEventListener("click",() =>{
            if(this.interval===null){
                this.start();
            } else {
                this.stop();
            }
        })
        this.el.reset.addEventListener("click",()=>{
            const inputMinutes = prompt("Please input number of minutes");    
            if(inputMinutes<60){
                this.stop();//上一个倒计时先停止
                this.remainingSeconds=inputMinutes*60; //remainingSeconds变化→start()开始倒计时 
                this.updateInterfaceTime();
            }    
        })
        // this.updateInterfaceControls()//更新button
        // this.updateInterfaceTime();//更新time
        // this.start();
        // this.stop();

    }
    updateInterfaceTime(){ //分：秒显示接口
        const minutes = Math.floor(this.remainingSeconds/60);
        const seconds = this.remainingSeconds % 60;
        this.el.minutes.textContent = minutes.toString().padStart(2,'0');
        this.el.seconds.textContent = seconds.toString().padStart(2,'0'); //TextContent:文本内容包括所有子节点的文本。
    }
    updateInterfaceControls(){
        if(this.interval===null){  //倒计时结束了
            this.el.control.innerHTML=`<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.remove("timer_btn-stop");
            //classList 属性返回元素的类名，作为 DOMTokenList 对象。该属性用于在元素中添加，移除及切换 CSS 类。classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。
            this.el.control.classList.add("timer_btn-start");
        } else { //倒计时没有结束
            this.el.control.innerHTML=`<span class="material-icons">pause</span>`;
            this.el.control.classList.remove("timer_btn-start");
            this.el.control.classList.add("timer_btn-stop");
        }
    }
    start (){
        if(this.remainingSeconds===0) return; //如果剩余时间为0秒 则返回
        
        //否则 更新时间
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if(this.remainingSeconds==0){
                this.stop();
            }
        },1000);
        this.updateInterfaceControls();//更新button 不要等到 remainingSeconds==0了再更新，因为按钮需要编程
    }
    stop(){
        clearInterval(this.interval);//使用 clearInterval() 来停止 setInterval 的执行：
        this.interval=null; 
        this.updateInterfaceControls();
    }
    // 类（class）通过 static 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能。
    static getHTML(){           
        return `
        <span class="timer_part timer_min">00</span>
        <span class="timer_part">:</span>
        <span class="timer_part timer_sec">00</span>
        <button type="button" class="timer_btn timer_btn-control timer_btn-start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer_btn timer_btn-reset">
            <span class="material-icons">timer</span>
        </button>
        `;
    }
}