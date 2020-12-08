import React, { FC, memo, useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';
import { View } from 'react-native';

import { Loader } from '../Loader/Loader';

import { SvgUriProps } from './SvgUri.interface';

const cache = {};

export const SvgUri: FC<SvgUriProps> = memo(({ uri, style }) => {
  const [xml, setXml] = useState<null | string>(cache[uri]);

  useEffect(() => {
    if (cache[uri]) {
      setXml(cache[uri]);
    } else {
      axios
        .get(uri)
        .then((r) => {
          setXml(r.data);
          cache[uri] = r.data;
        })
        .catch(() => {
          setXml(null);
        });
    }
  }, [uri]);

  return xml ? (
    <View style={style}>
      <SvgXml width="100%" height="100%" xml={xml} />
    </View>
  ) : (
    <Loader />
  );
});
