import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer';
import {supabase} from '../lib/supabase';
import {supabaseUrl} from '../constants';

export const getUserImageSrc = (imagePath: any) => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath);
  } else {
    return require('../assets/avatar.webp');
  }
};

export const getSupabaseFileUrl = (filePath: string) => {
  if (filePath) {
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`,
    };
  }
  return null;
};

export const uploadFile = async (
  folderName: string,
  fileUri: string,
  isImage: any,
) => {
  console.log('No ha entrado al try cathc image service');

  try {
    let fileName = getFilePath(folderName, isImage);
    // read the file content and convert it into base64
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log('Ya se procesó el filebae64 image service');
    // decode base64 to convert into ArrayBuffer
    let imageData = decode(fileBase64);
    //upload file to supabase bucket storage
    let {data, error} = await supabase.storage
      .from('uploads')
      .upload(fileName, imageData, {
        cacheControl: '3600',
        upsert: false,
        contentType: isImage ? 'image/*' : 'video/*',
      });
    console.log('enviado al bucket supabase image service');

    if (error) {
      console.log('file upload error: ', error);
      return {success: false, msg: 'Could not upload media'};
    }
    console.log('data: ', data);
    return {success: true, data: data?.path};
  } catch (error) {
    console.log('file upload error: ', error);
    return {success: false, msg: 'Could not upload media'};
  }
};

export const getFilePath = (folderName: string, isImage: any) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? '.png' : '.mp4'}`;
};
