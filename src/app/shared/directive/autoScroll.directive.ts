import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
 
@Directive({
  selector: '[auto-scroll]'
})
export class AutoScrollDirective {
  constructor(private el: ElementRef) { 
    this.anim();
  }

  anim() {
    let st = this.el.nativeElement.scrollTop;
    let sb = this.el.nativeElement.scrollHeight-this.el.nativeElement.offsetHeight;
  //    console.log(parseInt(this.el.nativeElement.innerHeight));
  //loop infinito por nao pegar o height
   //this.el.nativeElement.animate({scrollTop: st<sb/2 ? sb : 0}, 4000, this.anim());
  }
 
  // let $el = this.this.el.nativeElement.nativeElement;

  // @HostListener('load') autoScroll() {
  //   //this.highlight('yellow');

  //   function anim() {
  //       alert(33);
  //       let st = this.el.nativeElement.scrollTop();
  //       let sb = this.el.nativeElement.prop("scrollHeight")-this.el.nativeElement.innerHeight();
  //       this.el.nativeElement.animate({scrollTop: st<sb/2 ? sb : 0}, 4000, anim);
  //   }
  //   anim();
  // }

    // @HostListener('hover') stop() {
    //         this.el.stop();
    //     private highlight(color: string) {
    //         this.el.nativeElement.style.backgroundColor = color;
    //     }
    // }

}

