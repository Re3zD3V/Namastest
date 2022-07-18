import { AnimationController } from "@ionic/angular";

export class ModalAnimations {

    private animationCtrl: AnimationController
    public static modalAnimation: ModalAnimations;
    
    public static getModalAnimation(): ModalAnimations {
      if (ModalAnimations.modalAnimation) {
        return ModalAnimations.modalAnimation;
      } else {
        this.modalAnimation = new ModalAnimations();
        return ModalAnimations.modalAnimation;
      }
    }

    constructor() {
        this.animationCtrl = new AnimationController();
    }

   public enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  public leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
