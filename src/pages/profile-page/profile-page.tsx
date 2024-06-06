import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FileSizeExceedModal } from '@components/file-size-exceed-modal';
import { ModalAlert } from '@components/modal-alert';
import { ModalErrorSaveData } from '@components/modal-error-save-data';
import { UploadButton } from '@components/upload-button/upload-button';
import { ImgUrL } from '@constants/api';
import { DATE_FORMAT } from '@constants/app-constants';
import { MESSAGES } from '@constants/message-alert';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';
import { putUser, uploadImg } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { userSelector } from '@redux/slices/user-slice';
import { confirmPasswordValidator } from '@utils/confirm-password-validator';
import { emailRules } from '@utils/email-rules';
import { passwordValidator } from '@utils/password-validator';
import { Button, DatePicker, Form, Input, Modal, Progress, Typography, Upload } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload';
import { useForm } from 'antd/lib/form/Form';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';

import { FormUser } from '../../types/types';

import './profile-page.css';

const { Title } = Typography;

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const { token } = useSelector(authSelector);
    const { user } = useSelector(userSelector);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>(
        user.imgSrc
            ? [
                  {
                      uid: '-1',
                      name: 'userImage.jpg',
                      status: 'done',
                      url: user.imgSrc,
                  },
              ]
            : [],
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [modalVisibleSaveData, setModalVisibleSaveData] = useState(false);
    const defaultVisibility = !(window.innerWidth < 576);
    const width = useResponsiveVisibility(defaultVisibility);

    const confirmRules = [
        {
            required: isPasswordEntered,
            message: '',
        },
        confirmPasswordValidator,
    ];

    const passwordRules = [
        {
            required: isPasswordEntered,
            message: '',
            min: 8,
        },
        passwordValidator,
    ];

    const handlePreview = async (file: UploadFile) => {
        const newFile = { ...file };

        if (!newFile.url && !newFile.preview) {
            newFile.preview = await getBase64(newFile.originFileObj as RcFile);
        }

        setPreviewImage(newFile.url || (newFile.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            newFile.name ||
                (newFile.url ? newFile.url.substring(newFile.url.lastIndexOf('/') + 1) : ''),
        );
    };

    const handleCancel = () => setPreviewOpen(false);

    const customRequest = async (options: RcCustomRequestOptions) => {
        const { file } = options;

        try {
            setLoading(true);
            const response = await uploadImg(file as RcFile, token);
            const updatedFile: UploadFile<RcFile> = {
                ...(file as UploadFile<RcFile>),
                url: `${ImgUrL}${response.data.url}`,
            };

            setIsDisabled(false);
            setFileList([updatedFile]);
            setLoading(false);
        } catch {
            setLoading(false);
            setModalVisible(true);
            setFileList([
                {
                    uid: '-5',
                    name: 'image.png',
                    status: 'error',
                },
            ]);
        }
    };

    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    };

    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);

        setIsDisabled(hasErrors);
    };

    const onFinish = async (values: FormUser) => {
        let newValues = { ...values };

        delete newValues.confirm;
        newValues = Object.fromEntries(
            Object.entries(newValues).filter(([value]) => value),
        ) as FormUser;
        if (fileList.length && fileList[0].url) {
            newValues.imgSrc = fileList[0].url;
        }
        newValues.readyForJointTraining = true;
        try {
            await dispatch(putUser(newValues, token));
            setShowSuccessMessage(true);
            form.setFieldsValue({
                firstName: newValues.firstName,
                lastName: newValues.lastName,
                birthday: newValues.birthday,
            });
            form.resetFields(['password', 'confirm']);
            setIsDisabled(true);
            setIsPasswordEntered(false);
        } catch {
            setModalVisibleSaveData(true);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPasswordEntered(e.target.value.trim().length > 0);
    };

    const handleCloseSuccessMessage = () => setShowSuccessMessage(false);

    const handleCloseErrorSaveDataModal = () => setModalVisibleSaveData(false);

    const handleCloseFileSizeExceedModal = () => setModalVisible(false);

    const isSubmitDisabled = isDisabled || (fileList.length > 0 && fileList[0].status === 'error');

    let uploadContent = null;

    if (loading) {
        uploadContent = <Progress percent={50} size='small' showInfo={false} />;
    } else if (fileList.length === 0) {
        uploadContent = <UploadButton />;
    }

    return (
        <Content className='main profile-mobile'>
            {showSuccessMessage && (
                <ModalAlert
                    message={MESSAGES.PROFILE_UPDATED}
                    onClose={handleCloseSuccessMessage}
                />
            )}
            <ModalErrorSaveData
                visible={modalVisibleSaveData}
                onClose={handleCloseErrorSaveDataModal}
            />
            <FileSizeExceedModal visible={modalVisible} onClose={handleCloseFileSizeExceedModal} />
            <Form
                className='profile-page'
                size='large'
                onFinish={onFinish}
                onFieldsChange={handleFormChange}
                form={form}
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    birthday: user.birthday ? moment(user.birthday) : null,
                }}
            >
                <Title level={5} className='title'>
                    Личная информация
                </Title>
                <div className='info-user__wrapper'>
                    <div data-test-id='profile-avatar' className='profile-avatar'>
                        <Upload
                            name='avatar'
                            listType={width ? 'picture-card' : 'picture'}
                            className='avatar-uploader'
                            fileList={fileList}
                            onPreview={handlePreview}
                            customRequest={customRequest}
                            onRemove={handleRemove}
                        >
                            {uploadContent}
                        </Upload>
                    </div>

                    <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt='example' style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <div className='info-user__form'>
                        <Form.Item name='firstName' className='name'>
                            <Input placeholder='Имя' data-test-id='profile-name' />
                        </Form.Item>
                        <Form.Item name='lastName' className='surname'>
                            <Input placeholder='Фамилия' data-test-id='profile-surname' />
                        </Form.Item>

                        <Form.Item name='birthday' className='data-picker'>
                            <DatePicker
                                placeholder='Дата рождения'
                                format={DATE_FORMAT}
                                data-test-id='profile-birthday'
                            />
                        </Form.Item>
                    </div>
                </div>
                <Title level={5} className='title  title-private'>
                    Приватность и авторизация
                </Title>
                <div className='private-info__form'>
                    <Form.Item name={['email']} rules={emailRules}>
                        <Input addonBefore='e-mail:' data-test-id='profile-email' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        help='Пароль не менее 8 символов, c заглавной буквой и цифрой'
                        rules={passwordRules}
                    >
                        <Input.Password
                            placeholder='Пароль'
                            onChange={handlePasswordChange}
                            data-test-id='profile-password'
                        />
                    </Form.Item>
                    <Form.Item
                        name='confirm'
                        key='confirm'
                        dependencies={['password']}
                        rules={confirmRules}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id='profile-repeat-password'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            data-test-id='profile-submit'
                            size='large'
                            htmlType='submit'
                            disabled={isSubmitDisabled}
                            className='btn-save'
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Content>
    );
};
