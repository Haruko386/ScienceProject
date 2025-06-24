import os
from PIL import Image

def compress_images(input_folder, output_folder, max_size=(800, 800), quality=85):
    """
    压缩文件夹中的所有JPG和PNG图片
    
    参数:
        input_folder: 输入文件夹路径
        output_folder: 输出文件夹路径
        max_size: 图片的最大宽度或高度（保持宽高比）
        quality: 保存图片的质量（1-100）
    """
    # 确保输出文件夹存在
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # 支持的图片格式
    supported_formats = ('.jpg', '.jpeg', '.png')
    
    # 遍历输入文件夹
    for filename in os.listdir(input_folder):
        # 检查文件格式
        if filename.lower().endswith(supported_formats):
            try:
                # 构建完整文件路径
                input_path = os.path.join(input_folder, filename)
                output_path = os.path.join(output_folder, filename)
                
                # 打开图片
                with Image.open(input_path) as img:
                    # 保持宽高比进行缩放
                    img.thumbnail(max_size, Image.LANCZOS)
                    
                    # 根据原格式保存
                    if filename.lower().endswith(('.jpg', '.jpeg')):
                        img.save(output_path, 'JPEG', quality=quality, optimize=True)
                    elif filename.lower().endswith('.png'):
                        img.save(output_path, 'PNG', optimize=True)
                    
                    print(f"压缩成功: {filename} -> 原始大小: {os.path.getsize(input_path)//1024}KB, "
                          f"压缩后: {os.path.getsize(output_path)//1024}KB")
                    
            except Exception as e:
                print(f"处理 {filename} 时出错: {str(e)}")

if __name__ == "__main__":
    # 使用示例
    input_dir = "image/test-image"  # 替换为你的输入文件夹路径
    output_dir = "image/compress"  # 替换为你的输出文件夹路径
    
    # 压缩图片到最大800x800像素，JPEG质量85
    compress_images(input_dir, output_dir, max_size=(800, 800), quality=85)