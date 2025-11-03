// src/hooks/useCommentForm.ts
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

export interface CommentFormData {
  content: string;
  author?: string;
}

interface UseCommentFormProps {
  onSubmit: (data: CommentFormData) => Promise<void>;
  initialContent?: string;
}

export const useCommentForm = ({ onSubmit, initialContent = '' }: UseCommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [mentions, setMentions] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { 
    register, 
    handleSubmit: rhfHandleSubmit, 
    reset, 
    watch, 
    setValue, 
    formState: { errors } 
  } = useForm<CommentFormData>({
    defaultValues: {
      content: initialContent
    },
    mode: 'onChange'
  });

  const content = watch('content', '');
  
  // Update character count when content changes
  useEffect(() => {
    setCharacterCount(content.length);
  }, [content]);

  const onSubmitHandler = async (data: CommentFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      reset();
      setCharacterCount(0);
      setMentions([]);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addEmoji = (emoji: string) => {
    const currentContent = content || '';
    setValue('content', currentContent + emoji);
    setShowEmojiPicker(false);
  };

  // Detect mentions in content
  useEffect(() => {
    const mentionMatches = content.match(/@(\w+)/g);
    if (mentionMatches) {
      setMentions(mentionMatches.map(mention => mention.substring(1)));
    } else {
      setMentions([]);
    }
  }, [content]);

  return {
    register,
    handleSubmit: rhfHandleSubmit(onSubmitHandler),
    errors,
    reset,
    isSubmitting,
    characterCount,
    setCharacterCount,
    mentions,
    setMentions,
    showEmojiPicker,
    setShowEmojiPicker,
    addEmoji
  };
};