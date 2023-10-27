/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { updateData } from '@/core/firebase-bulk';
import { Text, View } from '@/ui';
import { RectCard } from '@/ui/core/rect-card';
type Props = {};
export const DayList = ({}: Props) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    // updateData();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap">
        <RectCard
          item={{
            title: 'Diwali',
            color: 'white',
            image:
              // 'https://firebasestorage.googleapis.com/v0/b/speedy-league-335221.appspot.com/o/app_assets%2Findependent-day.jpg?alt=media&token=41c6624a-59ec-4c7e-b009-8fd6fdc91cdd',
              'https://images.pexels.com/photos/2614852/pexels-photo-2614852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          onClick={() => navigation.navigate('ImageEditor')}
        />
      </View>
    </View>
  );
};
//https://firebasestorage.googleapis.com/v0/b/speedy-league-335221.appspot.com/o/app_assets%2Findependent-day.jpg?alt=media&token=08bb9d54-bca7-4a2e-b2dc-a1cfe8d390a4
