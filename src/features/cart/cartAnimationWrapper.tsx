import { FC, useEffect, useRef, useState, } from "react";
import { Animated } from "react-native";
import { hocStyles } from "styles/GlobalStyles.tsx";

interface CartAnimationWrapperProps {
    cartCount: number;
    children: React.ReactNode;
  }
  
  const CartAnimationWrapper: FC<CartAnimationWrapperProps> = ({ cartCount, children }) => {



    const slideAnim = useRef(new Animated.Value(0)).current;
const [hasAnimated, setHasAnimated] = useState(false);

useEffect(() => {
    let isMounted = true; // Check if the component is still mounted
  
    if (cartCount > 0 && !hasAnimated && isMounted) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (isMounted) setHasAnimated(true);
      });
    } else if (cartCount === 0 && hasAnimated && isMounted) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (isMounted) setHasAnimated(false);
      });
    }
  
    return () => {
      isMounted = false; // Cleanup the effect
    };
  }, [cartCount, hasAnimated]);
  


const slideUpStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0], // Moves from 100px down to 0px (its original position)
        }),
      },
    ],
    opacity: slideAnim,
  };
  








    return (
      <Animated.View style={[hocStyles.cartContainer,slideUpStyle]}>
        {children}
      </Animated.View>
    );
  };
  

  export default CartAnimationWrapper